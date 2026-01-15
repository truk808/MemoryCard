import { Theme } from '../../model/theme/types';

const THEME_KEY = 'app_theme';

export const getInitialTheme = (): Theme => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    return storedTheme === 'dark' ? 'dark' : 'light';
};

export const saveTheme = (theme: Theme) => {
    localStorage.setItem(THEME_KEY, theme);
};
