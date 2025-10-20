import { createSlice } from '@reduxjs/toolkit';
import {EntityType, Status} from "./type";


export interface Publication {
    publication_id: number,
    entity_type: EntityType,
    entity_id: number,
    user_id: number,
    nickname: string,
    status: Status,
    created_at: string,
    rating_avg: number,
    rating_count: number,
    additions_count: number,

}

interface PublicationState {
    publications: Publication[];
}

const photo = '/Frame'

const initialState: PublicationState = {
    publications: [
        {
            publication_id: 1,
            entity_type: 'group',
            entity_id: 10,
            user_id: 2,
            nickname: 'samura_chinck',
            status: 'published',
            created_at: '2000-01-01',
            rating_avg: 10,
            rating_count: 2,
            additions_count: 2,
        },
    ],
};

export const publicationSlice = createSlice({
    name: 'publication',
    initialState,
    reducers: {

    },
});

export const { } = publicationSlice.actions;
export const publicationReducer = publicationSlice.reducer;
