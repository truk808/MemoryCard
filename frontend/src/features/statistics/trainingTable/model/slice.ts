import {createSlice} from '@reduxjs/toolkit';

export interface TrainingSession {
    id: number;
    userId: number;
    entityId: number;
    entityType: 'module' | 'group';
    trainingType: string;
    module: string[];
    cardsTotal: number;
    correct: number;
    incorrect: number;
    timeSpent: number;
    date: string;
}

interface TrainingTableState {
    sessions: TrainingSession[];
}

const initialState: TrainingTableState = {
    sessions: [
        {
            id: 1,
            userId: 1,
            entityId: 101,
            entityType: 'module',
            trainingType: 'memorize',
            module: ['ООП'],
            cardsTotal: 20,
            correct: 15,
            incorrect: 5,
            timeSpent: 320,
            date: '2025-10-01',
        },
        {
            id: 2,
            userId: 1,
            entityId: 102,
            entityType: 'module',
            trainingType: 'memorize',
            module: ['ООП'],
            cardsTotal: 10,
            correct: 9,
            incorrect: 1,
            timeSpent: 180,
            date: '2025-10-02',
        },
        {
            id: 3,
            userId: 1,
            entityId: 11,
            entityType: 'group',
            trainingType: 'memorize',
            module: ['numbers'],
            cardsTotal: 40,
            correct: 34,
            incorrect: 6,
            timeSpent: 560,
            date: '2025-10-04',
        },
    ],
};

export const trainingTableSlice = createSlice({
    name: 'trainingTable',
    initialState,
    reducers: {},
});

export const {} = trainingTableSlice.actions;

export const trainingTableReducer = trainingTableSlice.reducer;
