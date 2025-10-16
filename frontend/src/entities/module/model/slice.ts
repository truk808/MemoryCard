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
            name: 'Законы Ньютона',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 2,
            user_id: 1,
            name: 'Динамика',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 3,
            user_id: 1,
            name: 'Кинематика',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 4,
            user_id: 1,
            name: 'Статика',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 5,
            user_id: 1,
            name: 'Термодинамика',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 6,
            user_id: 1,
            name: 'Оптика',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 7,
            user_id: 1,
            name: 'Квантовая механика',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 8,
            user_id: 1,
            name: 'Numbers',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 9,
            user_id: 1,
            name: 'University',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 10,
            user_id: 1,
            name: 'Color',
            icon: photo,
            create_at: '2022-03-01',
        },
        {
            id: 11,
            user_id: 1,
            name: 'Анекдоты',
            icon: photo,
            create_at: '2022-03-01',
        },

    ],
};

export const moduleSlice = createSlice({
    name: 'module',
    initialState,
    reducers: {
        addModule(state, action) {
            state.modules.push(action.payload);
        },
        changeModule(state, action) {
            const index = state.modules.findIndex(g => g.id === action.payload.id);
            if (index !== -1) {
                state.modules[index] = action.payload;
            }
        },
        removeModule(state, action) {
            state.modules.filter((group) => group.id === action.payload.id);
        }
    },
});

export const { addModule, removeModule, changeModule } = moduleSlice.actions;
export const moduleReducer = moduleSlice.reducer;
