import { createClient } from "urql";

export const urqlClient = createClient({
  url: `https://api.github.com/graphql`,
});
