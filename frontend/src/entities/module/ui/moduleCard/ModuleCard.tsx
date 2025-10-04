import React, {FC} from 'react';
import styles from './Module.module.scss'
import {Module} from "../../../index";
import {NavLink} from "react-router-dom";
import {MODULE_ROUTE} from "../../../../shared";

interface ModuleCardProps {
    module: Module;
}

export const ModuleCard: FC<ModuleCardProps> = ({module}) => {
    return (
        <NavLink to={`${MODULE_ROUTE}/${module.id}`}>
            <div className={styles.card}>
                <div className={styles.icon}>
                    <img src='/Frame.svg' alt=""/>
                </div>
                <div className={styles.cardInfo}>
                    <h2 className={styles.title}> ООП </h2>
                    <p className={styles.text}> карт много </p>
                </div>
            </div>
        </NavLink>
    );
};