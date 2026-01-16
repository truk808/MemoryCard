import React from 'react';
import styles from  './Logo.module.scss'
import {GlobalSvgSelector} from "../../assets";

export const Logo = () => {
    return (
        <div className={[styles.logo, styles.container].join(' ')}>
            <div className={styles.logo_icon}>
                <GlobalSvgSelector svgName={'logo'}/>
            </div>
            <div className={styles.logo_text}>
                Memory Card
            </div>
        </div>
    );
};
