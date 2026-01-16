import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Module} from "./types";

interface ModuleState {
    modules: Module[];
}

const initialState: ModuleState = {
    modules: [],
};

export const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {
        setModules(state, action) {
          state.modules = action.payload;
        },
        addModule(state, action) {
            state.modules.push(action.payload);
        },
        changeModule(state, action) {
            const index = state.modules.findIndex(g => g.id === action.payload.id);
            if (index !== -1) {
                state.modules[index] = action.payload;
            }
        },
        removeModule(state, action) {
            state.modules = state.modules.filter((group) => group.id !== action.payload);
        }
    },
});

export const { addModule, removeModule, changeModule, setModules } = moduleSlice.actions;
export const moduleReducer = moduleSlice.reducer;