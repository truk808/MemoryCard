import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Card {
    id: number;
    user_id: number;
    name: string;
    description: string;
    level: number;
    tags: string[];
    create_at: string;
}

interface CardState {
    cards: Card[];
}

const initialState: CardState = {
    cards: [
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            level: 0,
            tags: ['#Повторение', '#глаголы'],
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            description: 'ООП расшифровывается как объектно-ориентированное программирование — это подход к разработке программного обеспечения, при котором программа строится как совокупность взаимодействующих между собой объектов. ООП расшифровывается как объектно-ориентированное программирование — это подход к разработке программного обеспечения, при котором программа строится как совокупность взаимодействующих между собой объектов.',
            level: 0,
            tags: ['#Повторение', '#глаголы', '#Повторение', '#глаголы', '#Повторение', '#глаголы'],
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            level: 0,
            tags: ['#Повторение', '#глаголы'],
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            level: 0,
            tags: ['#Повторение', '#глаголы'],
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            level: 0,
            tags: ['#Повторение', '#глаголы'],
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            level: 0,
            tags: ['#Повторение', '#глаголы'],
            create_at: '2022-03-01',
        },
        {
            id: 1,
            user_id: 1,
            name: 'Unity',
            description: 'lorem lorem lorem lorem lorem lorem lorem lorem lorem ',
            level: 0,
            tags: ['#Повторение', 'глаголы'],
            create_at: '2022-03-01',
        },
    ],
};

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {

    },
});

export const { } = cardSlice.actions;
export const cardReducer = cardSlice.reducer;
