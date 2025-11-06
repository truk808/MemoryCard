import {createSlice} from "@reduxjs/toolkit";

export interface GroupModule extends Record<string, number> {
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
        addGroupModule: (state, action) => {
            state.groupModules.push(action.payload);
        },
        removeGroupModule(state, action) {
            state.groupModules = state.groupModules.filter((groupModule) => groupModule.id === action.payload.id);
        },
        removeAllByGroupId(state, action) {
            state.groupModules = state.groupModules.filter((groupModule) => groupModule.group_id === action.payload.group_id);

        }
    }
})

export const {addGroupModule, removeGroupModule, removeAllByGroupId} = groupModuleSlice.actions;
export const groupModuleReducer = groupModuleSlice.reducer;