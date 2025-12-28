import React from 'react';
import {Button, LOGIN_ROUTE} from "../../../shared";
import {useLocation} from "react-router-dom";
import {Auth} from "../../../features";

export const AuthPage = () => {
    const isLogin = useLocation().pathname === LOGIN_ROUTE

    return (
        <div>
            <Auth isLogin={isLogin}/>
        </div>
    );
};