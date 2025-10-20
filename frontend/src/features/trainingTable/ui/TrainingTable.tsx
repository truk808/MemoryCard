import React from 'react';
import styles from './TrainingTable.module.scss';

const data = [
    { id: 1, name: 'Заучивание', modules: 'ООП, ООП1', cards: 120, correct: '100(83%)', errors: '20(17%)', time: '4м 32сек', date: '01.01.2025' },
    { id: 2, name: 'Заучивание', modules: 'ООП, ООП1', cards: 120, correct: '100(83%)', errors: '20(17%)', time: '4м 32сек', date: '01.01.2025' },
    { id: 3, name: 'Заучивание', modules: 'ООП, ООП1', cards: 120, correct: '100(83%)', errors: '20(17%)', time: '4м 32сек', date: '01.01.2025' },
];

export const TrainingTable = () => {
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
                {data.map((row, i) => (
                    <tr key={i}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.cards}</td>
                        <td>{row.modules}</td>
                        <td className={styles.correct}>{row.correct}</td>
                        <td className={styles.errors}>{row.errors}</td>
                        <td>{row.time}</td>
                        <td>{row.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
