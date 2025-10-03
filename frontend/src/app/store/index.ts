import { configureStore } from '@reduxjs/toolkit';
import {groupReducer} from "../../entities/group/model/slice";
import {moduleReducer} from "../../entities/module/model/slice";

export const store = configureStore({
    reducer: {
        group: groupReducer,
        module: moduleReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
