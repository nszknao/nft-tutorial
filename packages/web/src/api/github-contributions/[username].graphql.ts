import { gql } from "urql";

gql`
  query GitHubContributions($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              color
              contributionCount
              weekday
              contributionLevel
            }
          }
        }
      }
    }
  }
`;
