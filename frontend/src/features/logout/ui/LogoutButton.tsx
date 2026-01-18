import { useDispatch } from 'react-redux';
import styles from './LogoutButton.module.scss'
import {setAuth, setUser} from "../../../entities/user";
import {GlobalSvgSelector} from "../../../shared/assets";

export const LogoutButton = () => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(setUser({}));
        dispatch(setAuth(false));
        localStorage.removeItem('token');
    };

    return (
        <button
            className='medium'
            onClick={logout}>
            <GlobalSvgSelector svgName="profile" />
        </button>
    );
};
