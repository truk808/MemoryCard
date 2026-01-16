import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Group} from "./types";

interface GroupState {
    groups: Group[];
}

const initialState: GroupState = {
    groups: [],
};

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
        setGroups(state, action) {
            state.groups = action.payload;
        },
        addGroup(state, action) {
            state.groups.push(action.payload);
        },
        addGroups(state, action) {
            state.groups = [...state.groups, ...action.payload]
        },
        changeGroup(state, action) {
            const index = state.groups.findIndex(g => g.id === action.payload.id);
            if (index !== -1) {
                state.groups[index] = action.payload;
            }
        },
        removeGroup(state, action) {
            state.groups = state.groups.filter((group) => group.id !== action.payload);
        }
    },
});

export const {setGroups, addGroup, changeGroup, removeGroup, addGroups} = groupSlice.actions;
export const groupReducer = groupSlice.reducer;
