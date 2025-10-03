import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Group {
    id: number;
    user_id: number;
    name: string;
    img: any,
    description: string;
    create_at: string;
}

interface GroupState {
    groups: Group[];
}

const photo = '/cat.png'

const initialState: GroupState = {
    groups: [
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            img: photo,
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            img: photo,
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            img: photo,
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            img: photo,
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            img: photo,
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            img: photo,
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            img: photo,
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            create_at: '2022-03-01',
        },
    ],
};

export const groupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {

    },
});

export const { } = groupSlice.actions;
export const groupReducer = groupSlice.reducer;
