import { createSlice } from '@reduxjs/toolkit';
import {CardTag} from "./types";

interface CardTagState {
    cardTags: CardTag[];
}

const initialState: CardTagState = {
    cardTags: [],
};

export const cardTagSlice = createSlice({
    name: 'cardTag',
    initialState,
    reducers: {
        setCardTags: (state, action) => {
          state.cardTags = action.payload;
        },
        addCardTag: (state, action) => {
            state.cardTags.push(action.payload);
        },
        removeCardTag(state, action) {
            state.cardTags = state.cardTags.filter(
                cardTag =>
                    !(
                        cardTag.cardId === action.payload.cardId &&
                        cardTag.tagId === action.payload.tagId
                    )
            );
        },
        removeAllTagsByCardId(state, action) {
            state.cardTags = state.cardTags.filter((cardTag) =>
                cardTag.cardId !== action.payload.id
            );
            console.log(action.payload, state.cardTags);
        }
    },
});

export const { addCardTag, removeCardTag, removeAllTagsByCardId, setCardTags } = cardTagSlice.actions;
export const cardTagReducer = cardTagSlice.reducer;
