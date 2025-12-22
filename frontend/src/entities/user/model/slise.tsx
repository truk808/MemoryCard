import {UserRole} from "./const";
import {createSlice} from "@reduxjs/toolkit";

interface User {
    id: number;
    email: string;
    nickname: string;
    role: UserRole;
}

interface UserState {
    user: User | undefined;
    isAuth: boolean
}

const initialState: UserState = {
    // user: {
    //     id: 1,
    //     email: 'ilay.shulga.ru@gmail.com',
    //     nickname: 'truk808',
    //     role: UserRole.USER,
    // },
    // isAuth: false,
    user: undefined,
    isAuth: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuth(state, action) {
            state.isAuth = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
        clearUser(state) {
            // state.user = null;
        }
    }
})

export const {setAuth, setUser} = userSlice.actions;
export const userReducer = userSlice.reducer;