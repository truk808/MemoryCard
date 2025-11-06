import {Group} from "./slice";

export type GroupWithPublication = Group & {
    nickname: string,
    rating: number,
    additions: number,
}