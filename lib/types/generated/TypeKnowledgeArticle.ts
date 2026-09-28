import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeKnowledgeArticleFields {
    title?: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    summary?: EntryFieldTypes.Symbol;
    details?: EntryFieldTypes.RichText;
    date?: EntryFieldTypes.Date;
    articleImage?: EntryFieldTypes.AssetLink;
    authorName?: EntryFieldTypes.Symbol;
    categoryName?: EntryFieldTypes.Symbol;
}

export type TypeKnowledgeArticleSkeleton = EntrySkeletonType<TypeKnowledgeArticleFields, "knowledgeArticle">;
export type TypeKnowledgeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeKnowledgeArticleSkeleton, Modifiers, Locales>;
