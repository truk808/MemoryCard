import React from 'react';
import styles from './MainPage.module.scss';
import {GroupsListSection, ModulesListSection} from "../../../widgets";

export const MainPage = () => {
    return (
        <div className={styles.page}>
            <GroupsListSection/>
            <ModulesListSection/>
        </div>
    );
};
