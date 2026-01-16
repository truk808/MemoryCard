import React from 'react';
import {useLocation} from "react-router-dom";
import {LOGIN_ROUTE} from "../../../shared/routes/const";
import {Auth} from "../../../features/auth";

export const AuthPage = () => {
    const isLogin = useLocation().pathname === LOGIN_ROUTE

    return (
        <div>
            <Auth isLogin={isLogin}/>
        </div>
    );
};