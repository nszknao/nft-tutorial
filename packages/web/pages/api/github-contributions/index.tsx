import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";
import {
  GitHubContributionsDocument,
  GitHubContributionsQuery,
} from "src/api/github-contributions/[username].graphql.generated";
import { ContributionLevel } from "src/types/graphql.generated";

const convertLevel = (level: ContributionLevel) => {
  switch (level) {
    case ContributionLevel.None:
      return 0;
    case ContributionLevel.FirstQuartile:
      return 1;
    case ContributionLevel.SecondQuartile:
      return 2;
    case ContributionLevel.ThirdQuartile:
      return 3;
    case ContributionLevel.FourthQuartile:
      return 4;
  }
};

const rle = (u8Array: Uint8Array) => {
  const result = [];

  let count = 1;
  let beforeCode = u8Array[0];

  for (let i = 1; i < u8Array.length; i++) {
    const code = u8Array[i];
    if (beforeCode === code && count < 256) count++;
    else {
      result.push(count, beforeCode);
      beforeCode = code;
      count = 1;
    }
  }
  result.push(count, beforeCode);

  return new Uint8Array(result);
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query;

  if (!username) {
    return new Response(`Invalid Parameter`, { status: 400 });
  }

  const response = await fetch(`https://api.github.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query: GitHubContributionsDocument.loc?.source.body,
      variables: { login: username },
    }),
  });
  const { data }: { data: GitHubContributionsQuery } = await response.json();

  const user = data.user;
  if (!user) {
    return new Response(`Does not exist user.`, { status: 400 });
  }

  const abiCoder = new ethers.utils.AbiCoder();

  const themeIndex = Math.floor(Math.random() * 5);

  let ret: Uint8Array = new Uint8Array([themeIndex, 23, 53, 30, 0]);

  const weekNum =
    user.contributionsCollection.contributionCalendar.weeks.length;
  for (let d = 0; d < 7; d++) {
    const row: number[] = [];
    for (let w = 0; w < weekNum; w++) {
      const dayNum =
        user.contributionsCollection.contributionCalendar.weeks[w]
          .contributionDays.length;
      if (dayNum <= d) {
        row.push(0);
        continue;
      }

      const level =
        user.contributionsCollection.contributionCalendar.weeks[w]
          .contributionDays[d].contributionLevel;
      row.push(convertLevel(level));
    }
    const rowStr = row.join("");
    const byteData = Uint8Array.from({ length: rowStr.length }, (e, index) =>
      parseInt(rowStr.charAt(index))
    );
    ret = new Uint8Array([...ret, ...rle(byteData)]);
  }
  return res.status(200).send({
    data: abiCoder.encode(["bytes"], [ethers.utils.hexlify(ret)]),
  });
};

export default handler;
