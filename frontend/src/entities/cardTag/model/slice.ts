import { createSlice } from '@reduxjs/toolkit';

export interface CardTag {
    id: number;
    tag_id: number;
    card_id: number;
}

interface CardTagState {
    cardTags: CardTag[];
}

const initialState: CardTagState = {
    cardTags: [
        {
            id: 1,
            tag_id: 1,
            card_id: 1,
        },
        {
            id: 1,
            tag_id: 1,
            card_id: 2,
        },
        {
            id: 1,
            tag_id: 1,
            card_id: 3,
        },
        {
            id: 1,
            tag_id: 1,
            card_id: 4,
        },
        {
            id: 1,
            tag_id: 1,
            card_id: 5,
        },
        {
            id: 1,
            tag_id: 1,
            card_id: 6,
        },
        {
            id: 1,
            tag_id: 1,
            card_id: 7,
        },
        {
            id: 1,
            tag_id: 1,
            card_id: 8,
        },
        {
            id: 1,
            tag_id: 2,
            card_id: 1,
        },
        {
            id: 1,
            tag_id: 2,
            card_id: 2,
        },
        {
            id: 1,
            tag_id: 2,
            card_id: 3,
        },
        {
            id: 1,
            tag_id: 2,
            card_id: 4,
        },
        {
            id: 1,
            tag_id: 2,
            card_id: 5,
        },
        {
            id: 1,
            tag_id: 2,
            card_id: 6,
        },
        {
            id: 1,
            tag_id: 2,
            card_id: 7,
        },
        {
            id: 1,
            tag_id: 2,
            card_id: 8,
        },
        {
            id: 1,
            tag_id: 3,
            card_id: 9,
        },
        {
            id: 1,
            tag_id: 3,
            card_id: 10,
        },
        {
            id: 1,
            tag_id: 3,
            card_id: 11,
        },
        {
            id: 1,
            tag_id: 3,
            card_id: 12,
        },
        {
            id: 1,
            tag_id: 3,
            card_id: 13,
        },
        {
            id: 1,
            tag_id: 3,
            card_id: 14,
        },
        {
            id: 1,
            tag_id: 3,
            card_id: 15,
        },
        {
            id: 1,
            tag_id: 3,
            card_id: 16,
        },
        {
            id: 1,
            tag_id: 4,
            card_id: 9,
        },
        {
            id: 1,
            tag_id: 4,
            card_id: 10,
        },
        {
            id: 1,
            tag_id: 4,
            card_id: 11,
        },
        {
            id: 1,
            tag_id: 4,
            card_id: 12,
        },
        {
            id: 1,
            tag_id: 4,
            card_id: 13,
        },
        {
            id: 1,
            tag_id: 4,
            card_id: 14,
        },
        {
            id: 1,
            tag_id: 4,
            card_id: 15,
        },
        {
            id: 1,
            tag_id: 4,
            card_id: 16,
        },
        {
            id: 1,
            tag_id: 5,
            card_id: 14,
        },
        {
            id: 1,
            tag_id: 5,
            card_id: 15,
        },
        {
            id: 1,
            tag_id: 5,
            card_id: 16,
        },
        {
            id: 1,
            tag_id: 6,
            card_id: 17,
        },
        {
            id: 1,
            tag_id: 7,
            card_id: 17,
        },
    ],
};

export const cardTagSlice = createSlice({
    name: 'cardTag',
    initialState,
    reducers: {
        addCardTag: (state, action) => {
            state.cardTags.push(action.payload);
        },
        removeCardTag(state, action) {
            state.cardTags = state.cardTags.filter((cardTag) => cardTag.id === action.payload.id);
        },
        removeAllByCardId(state, action) {
            state.cardTags = state.cardTags.filter((cardTag) => cardTag.card_id === action.payload.card_id);
        }
    },
});

export const { addCardTag, removeCardTag, removeAllByCardId } = cardTagSlice.actions;
export const cardTagReducer = cardTagSlice.reducer;
