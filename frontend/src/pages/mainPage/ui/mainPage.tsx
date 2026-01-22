import React from 'react';
import styles from './MainPage.module.scss';
import {GroupsListSection} from "../../../widgets/groupsListSection";
import {useSelector} from "react-redux";
import {selectAllGroups} from "../../../entities/group/model/selectors";
import {GroupCard} from "../../../entities/group";
import {ModulesListSection} from "../../../widgets/modulesListSection";

export const MainPage = () => {
    const group = useSelector(selectAllGroups)[0];

    return (
        <div>

            <h1 className={`heading-2xl ${styles.title}`}>Главная</h1>
            <GroupsListSection/>
            <ModulesListSection/>
        </div>
    );
};
