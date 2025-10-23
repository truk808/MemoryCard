import React, {useMemo} from 'react';
import styles from './DictionaryPage.module.scss'
import {DictionarySection} from "../../../widgets/dictionarySection/ui/DictionarySection";

export const DictionaryPage = () => {

    return (
        <div className={styles.dictionaryPage}>
            <DictionarySection />
            <div className={styles.translator}>

            </div>
        </div>
    );
};