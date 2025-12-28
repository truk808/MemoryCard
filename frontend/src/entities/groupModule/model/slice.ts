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
            state.groupModules = action.payload;
        },

        addGroupModule: (state, action) => {
            state.groupModules.push(action.payload);
        },
        removeGroupModule: (state, action) => {
            const { groupId, moduleId } = action.payload;
            state.groupModules = state.groupModules.filter(
                gm => !(gm.groupId === groupId && gm.moduleId === moduleId)
            );
        },
        removeAllByGroupId: (state, action) => {
            console.log(action);
            state.groupModules = state.groupModules.filter(
                (groupModule) => groupModule.groupId !== action.payload.groupId
            )
        }
    },
})


export const {addGroupModule, removeGroupModule, removeAllByGroupId, setGroupModules} = groupModuleSlice.actions;
export const groupModuleReducer = groupModuleSlice.reducer;