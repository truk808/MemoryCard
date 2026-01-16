import {UserRole} from "./const";
import {createSlice} from "@reduxjs/toolkit";
import {User} from "./types";

interface UserState {
    user: User | undefined;
    isAuth: boolean
}

const initialState: UserState = {
    user: undefined,
    isAuth: false,
}

export const userSlice = createSlice({
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

export const {setAuth, setUser} = userSlice.actions ;
export const userReducer = userSlice.reducer;