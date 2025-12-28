import {Group} from "./entityTypes";

export type GroupWithPublication = Group & {
    nickname: string,
    rating: number,
    additions: number,
}