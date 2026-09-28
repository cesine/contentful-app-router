import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeProductFields {
    name?: EntryFieldTypes.RichText;
    brand: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"chene" | "palmier" | "sapin">>;
    thumbnail2?: EntryFieldTypes.Symbol;
}

export type TypeProductSkeleton = EntrySkeletonType<TypeProductFields, "product">;
export type TypeProduct<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeProductSkeleton, Modifiers, Locales>;
