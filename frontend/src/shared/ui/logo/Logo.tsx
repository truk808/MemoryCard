import React from 'react';
import styles from  './Logo.module.scss'
import {GlobalSvgSelector} from "../../assets";

export const Logo = () => {
    return (
        <div className={[styles.logo, styles.container].join(' ')}>
            <div className={styles.logo__icon}>
                <GlobalSvgSelector svgName={'logo'}/>
            </div>
            <h1 className={`${styles.logo__text}`}>
                Memory Card
            </h1>
        </div>
    );
};
