import { useLocation } from 'react-router-dom';
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../routes/const";

export const useIsAuthPage = () => {
    const { pathname } = useLocation();

    return (
        pathname === LOGIN_ROUTE ||
        pathname === REGISTRATION_ROUTE
    );
};
