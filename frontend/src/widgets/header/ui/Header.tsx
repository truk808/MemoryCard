import React, {useEffect} from 'react';
import {Logo} from "./Logo";
import {Notification} from "./Notifications";
import {Profile} from "./Profile";
import styles from './Header.module.scss'
import {NavBar} from "../../../features";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../app/store";
import {useLocation} from "react-router-dom";
import {GlobalSvgSelector, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../../shared";
import {toggleTheme} from "../../../shared/model/theme/slice";

// переделать
export const Header = () => {
    const isLogin =  useLocation().pathname === LOGIN_ROUTE
    const isRegistration =  useLocation().pathname === REGISTRATION_ROUTE
    const isAuth = useSelector((state: RootState) => state.user.isAuth)

    const selectIsAuth = isAuth && !(isLogin || isRegistration)

    const dispatch = useDispatch();

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
                            <div onClick={() => dispatch(toggleTheme())}>
                                <GlobalSvgSelector svgName={'change-theme'}/>
                            </div>
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
