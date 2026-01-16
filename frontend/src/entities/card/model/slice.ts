import {createSlice} from '@reduxjs/toolkit';
import {Card} from "./types";

interface CardState {
    cards: Card[];
}

const initialState: CardState = {
    cards: [],
};

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        setCards(state, action) {
            state.cards = action.payload;
        },
        addCard(state, action) {
            state.cards.push(action.payload);
        },
        changeCard(state, action) {
            const index = state.cards.findIndex(card => card.id === action.payload.id);
            if (index !== -1) {
                state.cards[index] = action.payload;
            }
        },
        removeCard(state, action) {
            state.cards = state.cards.filter((card) => card.id !== action.payload);
        }
    },
});

export const { addCard, removeCard, changeCard, setCards } = cardSlice.actions;
export const cardReducer = cardSlice.reducer;
