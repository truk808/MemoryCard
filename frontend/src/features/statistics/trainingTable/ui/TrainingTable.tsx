import React from 'react';
import styles from './TrainingTable.module.scss';
import {selectTrainingTable} from "../model/selectors";
import {useSelector} from "react-redux";
import {TrainingSession} from "../model/slice";

const data = [
    { id: 1, name: 'Заучивание', modules: 'ООП, ООП1', cards: 120, correct: '100(83%)', errors: '20(17%)', time: '4м 32сек', date: '01.01.2025' },
    { id: 2, name: 'Заучивание', modules: 'ООП, ООП1', cards: 120, correct: '100(83%)', errors: '20(17%)', time: '4м 32сек', date: '01.01.2025' },
    { id: 3, name: 'Заучивание', modules: 'ООП, ООП1', cards: 120, correct: '100(83%)', errors: '20(17%)', time: '4м 32сек', date: '01.01.2025' },
];

export const TrainingTable = () => {

    const dataTable: TrainingSession[] = useSelector(selectTrainingTable);

    console.log(dataTable);

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Тренировка</th>
                    <th>Модули</th>
                    <th>Карт</th>
                    <th>Правильные ответы</th>
                    <th>Ошибки</th>
                    <th>Время</th>
                    <th>Дата</th>
                </tr>
                </thead>
                <tbody>
                {dataTable.map((data: TrainingSession, i) => (
                    <tr key={i}>
                        <td>{data.id}</td>
                        <td>{data.trainingType}</td>
                        <td>{data.module.join(',')}</td>
                        <td>{data.cardsTotal}</td>
                        <td className={styles.correct}>{data.correct}</td>
                        <td className={styles.errors}>{data.incorrect}</td>
                        <td>{data.timeSpent}</td>
                        <td>{data.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
