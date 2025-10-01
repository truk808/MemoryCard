import React from 'react';
import styles from './NavBar.module.scss'
import {NavLink, useLocation} from "react-router-dom";
import {NavItem, NavItems} from "../module/navItems";

export const NavBar = () => {
    const pathname = useLocation().pathname;

    return (
        <nav className={styles.nav}>
            {NavItems.map((item: NavItem) => (
                <NavLink to={item.href} className={pathname === item.href ? styles.active : ''}>
                    {item.name}
                </NavLink>
            ))}
        </nav>
    );
};