import {createSlice} from '@reduxjs/toolkit';
import {Module} from "../../../../entities/module";

export interface TrainingSession {
    id: number;
    userId: number;
    type: string;
    totalCards: number;
    correctAnswers: number;
    wrongAnswers: number;
    durationSeconds: number;
    createdAt: string;
    modules: Module[];

    entityId: number;
    entityType: 'module' | 'group';
}

interface TrainingTableState {
    sessions: TrainingSession[];
}

const initialState: TrainingTableState = {
    sessions: [],
};

export const trainingTableSlice = createSlice({
    name: 'trainingTable',
    initialState,
    reducers: {
        setSessions(state, action) {
            state.sessions = action.payload;
        }
    },
});

export const {setSessions} = trainingTableSlice.actions;

export const trainingTableReducer = trainingTableSlice.reducer;
