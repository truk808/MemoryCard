import React from 'react';
import styles from './DictionaryPage.module.scss'
import {DictionarySection} from "../../../widgets";

export const DictionaryPage = () => {

    return (
        <div className={styles.dictionaryPage}>
            <div className={styles.dictionaryContent}>
                <DictionarySection/>
            </div>
            <div className={styles.translator}/>
        </div>

    );
};