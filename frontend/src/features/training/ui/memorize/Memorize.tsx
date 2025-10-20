import React from 'react';
import styles from './Memorize.module.scss';
import { GlobalSvgSelector } from '../../../../shared';

export const Memorize = () => {
    const term = "Наследование";
    const options = [
        "Ответ1",
        "Ответ2",
        "Ответ3",
        "Ответ4"
    ];

    return (
        <div className={styles.memorize}>
            <div className={styles.card}>
                <div className={styles.helper}>
                    <GlobalSvgSelector svgName={'lamp'} />
                </div>
                <h1 className={styles.title}>{term}</h1>
            </div>

            <div className={styles.answers}>
                {options.map((option, index) => (
                    <div key={index} className={styles.answerCard}>
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};
