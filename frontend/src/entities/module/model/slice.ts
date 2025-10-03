import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Module {
    id: number;
    user_id: number;
    name: string;
    icon: string;
    create_at: string;
}

interface ModuleState {
    modules: Module[];
}

const photo = '/Frame'

const initialState: ModuleState = {
    modules: [
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            icon: photo,
            create_at: '2022-03-01',
        },
    ],
};

export const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {

    },
});

export const { } = moduleSlice.actions;
export const moduleReducer = moduleSlice.reducer;
