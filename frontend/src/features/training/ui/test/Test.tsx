import React from 'react';
import styles from './Test.module.scss';
import { GlobalSvgSelector, Input } from '../../../../shared';

export const Test = () => {
    const term = "принцип, позволяющий создавать новые классы (дочерние) на основе уже существующих (родительских), которые перенимают их свойства и методы";
    const [answer, setAnswer] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    };

    return (
        <div className={styles.test}>
            <div className={styles.card}>
                <div className={styles.helper}>
                    <GlobalSvgSelector svgName={'lamp'} />
                </div>
                <h1 className={styles.title}>{term}</h1>
            </div>

            <div className={styles.inputContainer}>
                <Input
                    value={answer}
                    onChange={handleChange}
                    placeholder="Введите термин"
                />
            </div>
        </div>
    );
};
