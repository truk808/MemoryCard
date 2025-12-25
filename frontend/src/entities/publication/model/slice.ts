import { createSlice } from '@reduxjs/toolkit';
import {EntityType, Status} from "./type";

export interface Publication {
    id: number;
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

    name: string;
    img: any,
    module_quantity: number;
    description: string;
    create_at: string;
}

interface PublicationState {
    publications: Publication[];
}


const photo1 = './d.png'
const fakeGroup = {

}

const initialState: PublicationState = {
    publications: [

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
