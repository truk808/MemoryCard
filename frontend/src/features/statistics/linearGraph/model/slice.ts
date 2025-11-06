import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ProgressPoint  {
    id: number;
    userId: number;
    moduleId: number;
    totalCards: number;
    level0: number;
    level1: number;
    level2: number;
    level3: number;
    date: string;
}

interface LinearGraphState {
    progress: ProgressPoint[];
}

const initialState: LinearGraphState = {
    progress: [
        {
            id: 1,
            userId: 1,
            moduleId: 101,
            totalCards: 10,
            level0: 5,
            level1: 3,
            level2: 1,
            level3: 1,
            date: '2025-01-01',
        },
        {
            id: 2,
            userId: 1,
            moduleId: 101,
            totalCards: 18,
            level0: 4,
            level1: 6,
            level2: 5,
            level3: 3,
            date: '2025-02-01',
        },
        {
            id: 3,
            userId: 1,
            moduleId: 101,
            totalCards: 27,
            level0: 2,
            level1: 7,
            level2: 10,
            level3: 8,
            date: '2025-03-01',
        },
    ],
};

export const linearGraphSlice = createSlice({
    name: 'linearGraph',
    initialState,
    reducers: {

    },
});

export const { } = linearGraphSlice.actions;
export const linearGraphReducer = linearGraphSlice.reducer;