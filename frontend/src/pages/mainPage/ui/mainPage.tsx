import React from 'react';
import styles from './MainPage.module.scss';
import {GroupsListSection} from "../../../widgets/groupsListSection";
import {ModulesListSection} from "../../../widgets/modulesListSection";

export const MainPage = () => {
    return (
        <div>
            <h1 className={`heading-2xl ${styles.title}`}>Главная</h1>
            <GroupsListSection/>
            <ModulesListSection/>
        </div>
    );
};
