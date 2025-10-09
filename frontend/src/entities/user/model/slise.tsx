import {UserRole} from "./const";
import {createSlice} from "@reduxjs/toolkit";

interface User {
    id: number;
    email: string;
    password: string;
    nickname: string;
    role: UserRole;
}

interface UserState {
    user: User;
}

const initialState: UserState = {
    user: {
        id: 1,
        email: 'ilay.shulga.ru@gmail.com',
        password: 'qwerty',
        nickname: 'truk808',
        role: UserRole.USER,
    },
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {}
})

export const {} = userSlice;
export const userReducer = userSlice.reducer;