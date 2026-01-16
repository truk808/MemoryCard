import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {Navigate, Route, Routes} from "react-router-dom";
import {RootState} from "../store";
import {authRoutes, publicRoutes} from "./Routes";
import {LOGIN_ROUTE, MAIN_ROUTES} from "../../shared/routes/const";

const AppRouter = () => {
    const isAuth = useSelector((state: RootState) => state.user.isAuth);

    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
            {publicRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<Navigate to={isAuth ? MAIN_ROUTES : LOGIN_ROUTE} replace />} />
        </Routes>
    );
};

export default AppRouter;