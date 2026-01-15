// shared/model/theme/theme.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '../theme/types';
import { getInitialTheme, saveTheme } from '../../lib/theme/getInitialTheme';

interface ThemeState {
    theme: Theme;
}

const initialState: ThemeState = {
    theme: getInitialTheme(),
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<Theme>) {
            state.theme = action.payload;
            saveTheme(action.payload);
        },
        toggleTheme(state) {
            const nextTheme = state.theme === 'light' ? 'dark' : 'light';
            state.theme = nextTheme;
            saveTheme(nextTheme);
        },
    },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
