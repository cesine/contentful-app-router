import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print } from "graphql";
import {
  GetArticleDocument,
  GetArticlesDocument,
} from "@/lib/types/graphql.generated";

type GraphQLResponse<TResult> = {
  data?: TResult;
  errors?: Array<{ message: string }>;
};

async function fetchGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
  preview = false,
): Promise<TResult> {
  const accessToken = preview
    ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    : process.env.CONTENTFUL_ACCESS_TOKEN;
  const spaceId = process.env.CONTENTFUL_SPACE_ID;

  if (!spaceId || !accessToken) {
    throw new Error("Contentful GraphQL environment variables are not configured.");
  }

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${spaceId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query: print(document), variables }),
      next: { tags: ["articles"] },
    },
  );

  const result = (await response.json()) as GraphQLResponse<TResult>;

  if (!response.ok || result.errors?.length) {
    const errorMessage = result.errors?.map((error) => error.message).join("; ");
    throw new Error(errorMessage || `Contentful request failed (${response.status}).`);
  }

  if (!result.data) {
    throw new Error("Contentful GraphQL response did not include data.");
  }

  return result.data;
}

export async function getAllArticles(limit = 3, isDraftMode = false) {
  const data = await fetchGraphQL(
    GetArticlesDocument,
    { limit, preview: isDraftMode },
    isDraftMode,
  );

  const items = data.knowledgeArticleCollection?.items ?? [];

  return items.filter(
    (article): article is NonNullable<typeof article> & { slug: string } =>
      article !== null && typeof article.slug === "string" && article.slug.length > 0,
  );
}

export async function getArticle(slug: string, isDraftMode = false) {
  const data = await fetchGraphQL(
    GetArticleDocument,
    { slug, preview: isDraftMode },
    isDraftMode,
  );

  return (
    data.knowledgeArticleCollection?.items?.find(
      (article) => article !== null,
    ) ?? null
  );
}
