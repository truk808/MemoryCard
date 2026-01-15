import { useEffect, type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../shared/model/theme/selector';

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const theme = useSelector(selectTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    return <>{children}</>;
};
