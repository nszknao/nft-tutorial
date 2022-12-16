import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import {
  GitHubContributionsDocument,
  GitHubContributionsQuery,
} from "src/api/github-contributions/[username].graphql.generated";

export const config = {
  runtime: "experimental-edge",
};

//
const size = 15;

const width = 53 * size;
const height = 53 * size;

const handler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return new Response(`Invalid Parameter`, { status: 400 });
  }

  const ret = await fetch(`https://api.github.com/graphql`, {
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
  const { data }: { data: GitHubContributionsQuery } = await ret.json();

  const user = data.user;
  if (!user) {
    return new Response(`Does not exist user.`, { status: 400 });
  }

  return new ImageResponse(
    (
      <div tw="flex w-full h-full relative">
        <div tw="flex items-center w-full h-full">
          {user.contributionsCollection.contributionCalendar.weeks.map(
            (week, index) => (
              <div
                key={index}
                tw="flex flex-col justify-start"
                style={{ height: `${size * 7}px` }}
              >
                {week.contributionDays.map((day) => (
                  <div
                    key={day.weekday}
                    tw="flex flex-shrink-0"
                    style={{
                      background: day.color,
                      width: `${size}px`,
                      height: `${size}px`,
                    }}
                  />
                ))}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      width,
      height,
    }
  );
};

export default handler;
