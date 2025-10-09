import {createSlice} from "@reduxjs/toolkit";

export interface GroupModule extends Record<string, number>{
    id: number;
    group_id: number;
    module_id: number;
}

interface GroupModuleState {
    groupModules: GroupModule[];
}

const initialState: GroupModuleState = {
    groupModules: [
        {
            id: 1,
            group_id: 1,
            module_id: 1,
        },
        {
            id: 2,
            group_id: 1,
            module_id: 2,
        },
        {
            id: 3,
            group_id: 2,
            module_id: 8,
        },
    ],
}

const groupModuleSlice = createSlice({
    name: "groupModule",
    initialState,
    reducers: {

    }
})

export const { } = groupModuleSlice;
export const groupModuleReducer = groupModuleSlice.reducer;