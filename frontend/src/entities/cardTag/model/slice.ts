import { createSlice } from '@reduxjs/toolkit';
import {CardTag} from "../../../shared";

interface CardTagState {
    cardTags: CardTag[];
}

const initialState: CardTagState = {
    cardTags: [
        // {
        //     id: 1,
        //     tag_id: 1,
        //     card_id: 1,
        // },
        // {
        //     id: 1,
        //     tag_id: 1,
        //     card_id: 2,
        // },
        // {
        //     id: 1,
        //     tag_id: 1,
        //     card_id: 3,
        // },
        // {
        //     id: 1,
        //     tag_id: 1,
        //     card_id: 4,
        // },
        // {
        //     id: 1,
        //     tag_id: 1,
        //     card_id: 5,
        // },
        // {
        //     id: 1,
        //     tag_id: 1,
        //     card_id: 6,
        // },
        // {
        //     id: 1,
        //     tag_id: 1,
        //     card_id: 7,
        // },
        // {
        //     id: 1,
        //     tag_id: 1,
        //     card_id: 8,
        // },
        // {
        //     id: 1,
        //     tag_id: 2,
        //     card_id: 1,
        // },
        // {
        //     id: 1,
        //     tag_id: 2,
        //     card_id: 2,
        // },
        // {
        //     id: 1,
        //     tag_id: 2,
        //     card_id: 3,
        // },
        // {
        //     id: 1,
        //     tag_id: 2,
        //     card_id: 4,
        // },
        // {
        //     id: 1,
        //     tag_id: 2,
        //     card_id: 5,
        // },
        // {
        //     id: 1,
        //     tag_id: 2,
        //     card_id: 6,
        // },
        // {
        //     id: 1,
        //     tag_id: 2,
        //     card_id: 7,
        // },
        // {
        //     id: 1,
        //     tag_id: 2,
        //     card_id: 8,
        // },
        // {
        //     id: 1,
        //     tag_id: 3,
        //     card_id: 9,
        // },
        // {
        //     id: 1,
        //     tag_id: 3,
        //     card_id: 10,
        // },
        // {
        //     id: 1,
        //     tag_id: 3,
        //     card_id: 11,
        // },
        // {
        //     id: 1,
        //     tag_id: 3,
        //     card_id: 12,
        // },
        // {
        //     id: 1,
        //     tag_id: 3,
        //     card_id: 13,
        // },
        // {
        //     id: 1,
        //     tag_id: 3,
        //     card_id: 14,
        // },
        // {
        //     id: 1,
        //     tag_id: 3,
        //     card_id: 15,
        // },
        // {
        //     id: 1,
        //     tag_id: 3,
        //     card_id: 16,
        // },
        // {
        //     id: 1,
        //     tag_id: 4,
        //     card_id: 9,
        // },
        // {
        //     id: 1,
        //     tag_id: 4,
        //     card_id: 10,
        // },
        // {
        //     id: 1,
        //     tag_id: 4,
        //     card_id: 11,
        // },
        // {
        //     id: 1,
        //     tag_id: 4,
        //     card_id: 12,
        // },
        // {
        //     id: 1,
        //     tag_id: 4,
        //     card_id: 13,
        // },
        // {
        //     id: 1,
        //     tag_id: 4,
        //     card_id: 14,
        // },
        // {
        //     id: 1,
        //     tag_id: 4,
        //     card_id: 15,
        // },
        // {
        //     id: 1,
        //     tag_id: 4,
        //     card_id: 16,
        // },
        // {
        //     id: 1,
        //     tag_id: 5,
        //     card_id: 14,
        // },
        // {
        //     id: 1,
        //     tag_id: 5,
        //     card_id: 15,
        // },
        // {
        //     id: 1,
        //     tag_id: 5,
        //     card_id: 16,
        // },
        // {
        //     id: 1,
        //     tag_id: 6,
        //     card_id: 17,
        // },
        // {
        //     id: 1,
        //     tag_id: 7,
        //     card_id: 17,
        // },
    ],
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
            state.cardTags = state.cardTags.filter((cardTag) =>
                !(cardTag.card_id === action.payload.card_id && cardTag.id === action.payload.tag_id)
            );
        },
        removeAllTagsByCardId(state, action) {
            state.cardTags = state.cardTags.filter((cardTag) =>
                cardTag.card_id !== action.payload.id
            );
            console.log(action.payload, state.cardTags);
        }
    },
});

export const { addCardTag, removeCardTag, removeAllTagsByCardId, setCardTags } = cardTagSlice.actions;
export const cardTagReducer = cardTagSlice.reducer;
