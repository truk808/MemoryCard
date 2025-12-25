import {createSlice} from "@reduxjs/toolkit";
import {GroupModule} from "../../../shared";

interface GroupModuleState {
    groupModules: GroupModule[];
}

const initialState: GroupModuleState = {
    groupModules: [],
}

const groupModuleSlice = createSlice({
    name: "groupModule",
    initialState,
    reducers: {
        setGroupModules: (state, action) => {
            state.groupModules = action.payload
        },
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

export const {addGroupModule, removeGroupModule, removeAllByGroupId, setGroupModules} = groupModuleSlice.actions;
export const groupModuleReducer = groupModuleSlice.reducer;