import React from 'react';
import styles from './MainPage.module.scss';
import {GroupsListSection, ModulesListSection} from "../../../widgets";

export const MainPage = () => {
    return (
        <div>
            <h1 className={styles.title}>Главная</h1>
            <GroupsListSection/>
            <ModulesListSection/>
        </div>
    );
};
