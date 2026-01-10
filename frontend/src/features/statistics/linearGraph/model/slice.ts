import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ProgressPoint  {
    id: number;
    user_id: number;
    entity_id: number;
    entity_type: 'module' | 'group';
    date: string;
    level0: number;
    level1: number;
    level2: number;
    level3: number;
}

interface LinearGraphState {
    progress: ProgressPoint[];
}

const initialState: LinearGraphState = {
    progress: [],
};

export const linearGraphSlice = createSlice({
    name: 'linearGraph',
    initialState,
    reducers: {
        setProgress: (state, action: PayloadAction<ProgressPoint[]>) => {
            state.progress = action.payload;
        },
        addProgressPoint: (state, action: PayloadAction<ProgressPoint>) => {
            const index = state.progress.findIndex(p =>
                p.id === action.payload.id
            );
            if (index !== -1) {
                state.progress[index] = action.payload;
            } else {
                state.progress.push(action.payload);
            }
        },
    },

});

export const { setProgress, addProgressPoint } = linearGraphSlice.actions;
export const linearGraphReducer = linearGraphSlice.reducer;