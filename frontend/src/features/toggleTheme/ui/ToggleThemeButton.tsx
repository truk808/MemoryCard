import { useDispatch } from 'react-redux';
import styles from './ToggleTheme.module.scss';
import {toggleTheme} from "../../../shared/model/theme";
import {GlobalSvgSelector} from "../../../shared/assets";

export const ToggleThemeButton = () => {
    const dispatch = useDispatch();

    return (
        <button className='medium' onClick={() => dispatch(toggleTheme())}>
            <GlobalSvgSelector svgName="change-theme" />
        </button>
    );
};
