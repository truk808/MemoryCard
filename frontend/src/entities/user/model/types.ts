import {UserRole} from "./const";

export interface User {
    id: number;
    email: string;
    nickname: string;
    role: UserRole;
}