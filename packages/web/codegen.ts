import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://api.github.com/graphql": {
        headers: {
          Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        },
      },
    },
  ],
  documents: ["src/**/*.graphql.ts"],
  generates: {
    "src/types/graphql.generated.ts": {
      plugins: ["typescript"],
      config: {
        enumAsTypes: true,
        scalars: {},
      },
    },
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "types/graphql.generated.ts",
      },
      plugins: ["typescript-operations", "typescript-urql"],
      config: {
        withComponent: false,
        withHooks: true,
        withHOC: false,
        scalars: {},
      },
    },
  },
};
export default config;
