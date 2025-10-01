import React from 'react';
import {Logo} from "./Logo";
import {Notification} from "./Notifications";
import {Profile} from "./Profile";
import styles from './Header.module.scss'
import {NavBar} from "../../../features";

export const Header = () => {
    return (
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
    );
};
