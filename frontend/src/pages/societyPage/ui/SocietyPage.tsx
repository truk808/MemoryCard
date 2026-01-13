import React from 'react';
import styles from './SocietyPage.module.scss'
import {Section} from "../../../widgets";
import {CardList, Tabs} from "../../../shared";
import {selectAllPublications, selectPublications} from "../../../entities/publication/model/selectors";
import {useSelector} from "react-redux";
import {GroupCard} from "../../../entities";
import SocietySection from "../../../widgets/societySection/ui/SocietySection";

export const SocietyPage = ({}) => {
    return (
        <div className={styles.societyPage}>
            <SocietySection/>
        </div>
    );
};