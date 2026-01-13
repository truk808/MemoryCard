import { createSlice } from '@reduxjs/toolkit';
import {EntityType, Status} from "./type";
import {Group} from "../../../shared";
 // переделать
export interface Publication {
    id: number;
    entityType: EntityType,
    entityId: number,
    authorUserId: number,
    status: Status,
    downloadCount: number,
    name: string ,
    description: string  ,
    img: File | null,
    userId: number,
}

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
