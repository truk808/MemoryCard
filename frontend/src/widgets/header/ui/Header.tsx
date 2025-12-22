import React, {useEffect} from 'react';
import {Logo} from "./Logo";
import {Notification} from "./Notifications";
import {Profile} from "./Profile";
import styles from './Header.module.scss'
import {NavBar} from "../../../features";
import {useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {useLocation} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../../shared";

export const Header = () => {
    const isLogin =  useLocation().pathname === LOGIN_ROUTE
    const isRegistration =  useLocation().pathname === REGISTRATION_ROUTE
    const isAuth = useSelector((state: RootState) => state.user.isAuth)

    const selectIsAuth = isAuth && !(isLogin || isRegistration)

    return (
        <>
            {selectIsAuth ?
                <header className={styles.header}>
                    <div className={['container', styles.header_itemContainer].join(' ')}>
                        <div className={styles.header_logoNav}>
                            <Logo/>
                            <NavBar/>
                        </div>
                        <div className={styles.header_notificationsProfile}>
                            <Notification/>
                            <Profile/>
                        </div>
                    </div>
                </header>
                :
                null
            }
        </>
    );
};
