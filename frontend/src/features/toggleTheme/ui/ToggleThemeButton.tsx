import { useDispatch } from 'react-redux';
import {toggleTheme} from "../../../shared/model/theme";
import {GlobalSvgSelector} from "../../../shared/assets";

export const ToggleThemeButton = () => {
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(toggleTheme())}>
            <GlobalSvgSelector svgName="change-theme" />
        </button>
    );
};
