import {Card, Tag} from "./entityTypes";

export type CardWithTags = Card & {
    tags: Tag[];
};