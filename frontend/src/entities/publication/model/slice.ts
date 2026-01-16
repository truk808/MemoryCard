import { createSlice } from '@reduxjs/toolkit';
import {Publication} from "./types";
 // переделать

interface PublicationState {
    publications: Publication[];
}

const initialState: PublicationState = {
    publications: [],
};

export const publicationSlice = createSlice({
    name: 'publication',
    initialState,
    reducers: {
    setPublications: (state, action) => {
        state.publications = action.payload;
    }
    },
});

export const { setPublications } = publicationSlice.actions;
export const publicationReducer = publicationSlice.reducer;
