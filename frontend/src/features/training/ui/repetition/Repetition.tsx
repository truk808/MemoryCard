import React from 'react';
import styles from './Repetition.module.scss'
import {GlobalSvgSelector} from "../../../../shared";

export const Repetition = () => {
    return (
        <div className={styles.repetition}>
            <div className={styles.card}>
                <div className={styles.helper}>
                    <GlobalSvgSelector svgName={'lamp'} />
                </div>
                <h1 className={styles.title}> Наследование </h1>
                <div className={styles.arrowsContainer}>
                    <div className={styles.arrowLeft}>
                        <GlobalSvgSelector svgName={'straight-arrow-left'}/>
                    </div>
                    <div className={styles.arrowRight}>
                        <GlobalSvgSelector svgName={'straight-arrow-right'}/>
                    </div>
                </div>
            </div>
        </div>
    );
};