import { config as loadEnv } from "dotenv";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnv({ path: ".env.local" });

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken =
  process.env.CONTENTFUL_SCHEMA_TOKEN ??
  process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN ??
  process.env.CONTENTFUL_ACCESS_TOKEN;

if (!spaceId || !accessToken) {
  throw new Error(
    "CONTENTFUL_SPACE_ID and a Contentful read token must be set to generate GraphQL types.",
  );
}

const config: CodegenConfig = {
  schema: [
    {
      [`https://graphql.contentful.com/content/v1/spaces/${spaceId}`]: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    },
  ],
  documents: ["graphql/**/*.graphql"],
  generates: {
    "./lib/types/graphql.generated.ts": {
      plugins: [
        {
          add: {
            content: 'import type { Document } from "@contentful/rich-text-types";',
          },
        },
        "typescript",
        "typescript-operations",
        "typed-document-node",
      ],
      config: {
        strictScalars: true,
        scalars: {
          DateTime: { input: "string", output: "string" },
          Dimension: { input: "number", output: "number" },
          HexColor: { input: "string", output: "string" },
          JSON: { input: "unknown", output: "Document" },
          Quality: { input: "number", output: "number" },
        },
      },
    },
  },
};

export default config;
