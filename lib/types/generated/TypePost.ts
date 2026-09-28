import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeAuthorSkeleton } from "./TypeAuthor";

export interface TypePostFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    content: EntryFieldTypes.RichText;
    excerpt: EntryFieldTypes.Symbol;
    coverImage: EntryFieldTypes.AssetLink;
    date: EntryFieldTypes.Date;
    author: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
}

export type TypePostSkeleton = EntrySkeletonType<TypePostFields, "post">;
export type TypePost<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePostSkeleton, Modifiers, Locales>;
