import {createSlice} from "@reduxjs/toolkit";

export interface ModuleCard extends Record<string, number> {
    id: number;
    module_id: number;
    card_id: number;
}

interface ModuleCardState {
    moduleCards: ModuleCard[];
}

const initialState: ModuleCardState = {
    moduleCards: [
        {
            id: 1,
            module_id: 1,
            card_id: 14,
        },
        {
            id: 2,
            module_id: 1,
            card_id: 15,
        },
        {
            id: 3,
            module_id: 1,
            card_id: 16,
        },
        {
            id: 4,
            module_id: 2,
            card_id: 9,
        },
        {
            id: 5,
            module_id: 2,
            card_id: 10,
        },
        {
            id: 6,
            module_id: 2,
            card_id: 11,
        },
        {
            id: 7,
            module_id: 2,
            card_id: 12,
        },
        {
            id: 8,
            module_id: 2,
            card_id: 13,
        },
        {
            id: 9,
            module_id: 8,
            card_id: 1,
        },
        {
            id: 10,
            module_id: 8,
            card_id: 2,
        },
        {
            id: 11,
            module_id: 8,
            card_id: 3,
        },
        {
            id: 12,
            module_id: 8,
            card_id: 4,
        },
        {
            id: 13,
            module_id: 8,
            card_id: 5,
        },
        {
            id: 14,
            module_id: 8,
            card_id: 6,
        },
        {
            id: 15,
            module_id: 8,
            card_id: 7,
        },
        {
            id: 16,
            module_id: 8,
            card_id: 8,
        },
    ],
}

const moduleCardSlice = createSlice({
    name: "moduleCard",
    initialState,
    reducers: {}
})

export const {} = moduleCardSlice
export const moduleCardReducer = moduleCardSlice.reducer