import React from 'react';
import styles from './SocietyPage.module.scss'
import {SocietySection} from "../../../widgets/societySection";

export const SocietyPage = ({}) => {
    return (
        <div className={styles.societyPage}>
            <SocietySection/>
        </div>
    );
};