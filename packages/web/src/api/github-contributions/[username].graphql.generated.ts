import * as Types from '../../types/graphql.generated';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GitHubContributionsQueryVariables = Types.Exact<{
  login: Types.Scalars['String'];
}>;


export type GitHubContributionsQuery = { __typename?: 'Query', user?: { __typename?: 'User', contributionsCollection: { __typename?: 'ContributionsCollection', contributionCalendar: { __typename?: 'ContributionCalendar', totalContributions: number, weeks: Array<{ __typename?: 'ContributionCalendarWeek', contributionDays: Array<{ __typename?: 'ContributionCalendarDay', color: string, contributionCount: number, weekday: number, contributionLevel: Types.ContributionLevel }> }> } } } | null };


export const GitHubContributionsDocument = gql`
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

export function useGitHubContributionsQuery(options: Omit<Urql.UseQueryArgs<GitHubContributionsQueryVariables>, 'query'>) {
  return Urql.useQuery<GitHubContributionsQuery, GitHubContributionsQueryVariables>({ query: GitHubContributionsDocument, ...options });
};