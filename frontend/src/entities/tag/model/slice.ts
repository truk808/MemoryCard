import { createSlice } from '@reduxjs/toolkit';
import {Tag} from "./types";

interface TagState {
    tags: Tag[];
}

const initialState: TagState = {
    tags: [],
};

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
        setTags(state, action) {
            state.tags = action.payload;
        },
        addTag(state, action) {
            state.tags.push(action.payload);
        },
        changeTag(state, action) {
            const index = state.tags.findIndex(tag => tag.id === action.payload.id);
            if (index !== -1) {
                state.tags[index] = action.payload;
            }
        },
        removeTag(state, action) {
            state.tags = state.tags.filter((tag) => tag.id !== action.payload.id);
        }
    },
});

export const { addTag, removeTag, changeTag, setTags } = tagSlice.actions;
export const tagReducer = tagSlice.reducer;
