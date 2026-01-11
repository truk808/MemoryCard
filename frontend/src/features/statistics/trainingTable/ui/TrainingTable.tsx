import React, {FC, useEffect} from 'react';
import styles from './TrainingTable.module.scss';
import {selectTrainingTable} from "../model/selectors";
import {useSelector} from "react-redux";
import {TrainingSession} from "../model/slice";

// const data = [
//     { id: 1, name: 'Заучивание', modules: 'ООП, ООП1', cards: 120, correct: '100(83%)', errors: '20(17%)', time: '4м 32сек', date: '01.01.2025' },
//     { id: 2, name: 'Заучивание', modules: 'ООП, ООП1', cards: 120, correct: '100(83%)', errors: '20(17%)', time: '4м 32сек', date: '01.01.2025' },
//     { id: 3, name: 'Заучивание', modules: 'ООП, ООП1', cards: 120, correct: '100(83%)', errors: '20(17%)', time: '4м 32сек', date: '01.01.2025' },
// ];

interface TrainingTableProps {
    sessions: TrainingSession[];
}

export const TrainingTable: FC<TrainingTableProps> = ({sessions}) => {

    useEffect(() => {
        console.log(sessions);
    }, []);

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
                {sessions.map((data: TrainingSession, i) => (
                    <tr key={i}>
                        <td>{data.id}</td>
                        <td>{data.type}</td>
                        <td>{data.modules.map(m => m.name).join(', ')}</td>
                        <td>{data.totalCards}</td>
                        <td className={styles.correct}>{data.correctAnswers}</td>
                        <td className={styles.errors}>{data.wrongAnswers}</td>
                        <td>{data.durationSeconds}</td>
                        <td>{data.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
