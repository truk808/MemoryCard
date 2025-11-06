import { createSlice } from '@reduxjs/toolkit';

export interface Tag {
    id: number;
    user_id: number;
    name: string;
}

interface TagState {
    tags: Tag[];
}

const initialState: TagState = {
    tags: [
        {
            id: 1,
            user_id: 1,
            name: '#аглиский',
        },
        {
            id: 2,
            user_id: 1,
            name: '#числа',
        },
        {
            id: 3,
            user_id: 1,
            name: '#физика',
        },
        {
            id: 4,
            user_id: 1,
            name: '#динамика',
        },
        {
            id: 5,
            user_id: 1,
            name: '#закон Ньютона',
        },
        {
            id: 6,
            user_id: 1,
            name: '#тег',
        },
        {
            id: 7,
            user_id: 1,
            name: '#свег',
        },
    ],
};

export const tagSlice = createSlice({
    name: 'tag',
    initialState,
    reducers: {
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

export const { addTag, removeTag, changeTag } = tagSlice.actions;
export const tagReducer = tagSlice.reducer;
