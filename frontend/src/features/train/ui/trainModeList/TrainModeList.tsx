import React from 'react';
import styles from './TrainModeList.module.scss'
import {TrainModeButton} from "../trainModeButton/TrainModeButton";

const TRAINS = ["repetition", "memorization", "test", "pair"]

export const TrainModeList = () => {
    return (
        <div className={styles.TrainModeList}>
            <TrainModeButton typeTrainMode={'repetition'}>
                Повторение
            </TrainModeButton>
            <TrainModeButton typeTrainMode={'memorization'}>
                Заучивание
            </TrainModeButton>
            <TrainModeButton typeTrainMode={'test'}>
                Тест
            </TrainModeButton>
            <TrainModeButton typeTrainMode={'pair'}>
                Соответствие
            </TrainModeButton>
        </div>
    );
};