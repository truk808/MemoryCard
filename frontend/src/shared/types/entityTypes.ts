//переделать
import {Card} from "../../entities/card";
import {Group} from "../../entities/group";
import {Tag} from "../../entities/tag";

export type CardWithTags = Card & {
    tags: Tag[];
};

export type GroupWithPublication = Group & {
    nickname: string,
    rating: number,
    additions: number,
}


