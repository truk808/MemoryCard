import React from 'react';
import styles from './DictionaryPage.module.scss'
import {DictionarySection} from "../../../widgets";

export const DictionaryPage = () => {

    return (
        <div className={styles.dictionaryPage}>
            <DictionarySection />
            <div className={styles.translator}>

            </div>
        </div>
    );
};