import {Card} from "./slice";
import {Tag} from "../../tag/model/slice";

export type CardWithTags = Card & {
    tags: Tag[];
};