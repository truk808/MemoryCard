import React from 'react';
import styles from './TrainModeList.module.scss'
import {TrainModeButton} from "../trainModeButton/TrainModeButton";
import {NavLink} from "react-router-dom";
import {TRAINING_ROUTE} from "../../../../shared";

const TRAINS = ["repetition", "memorization", "", "pair"]

export const TrainModeList = () => {
    return (
        <div className={styles.TrainModeList}>
            <NavLink to={`${TRAINING_ROUTE}?type=repetition`}>
                <TrainModeButton typeTrainMode={'repetition'}>
                    Повторение
                </TrainModeButton>
            </NavLink>
            <NavLink to={`${TRAINING_ROUTE}?type=memorization`}>
                <TrainModeButton typeTrainMode={'memorization'}>
                    Заучивание
                </TrainModeButton>
            </NavLink>
            <NavLink to={`${TRAINING_ROUTE}?type=test`}>
                <TrainModeButton typeTrainMode={'test'}>
                    Тест
                </TrainModeButton>
            </NavLink>
            <NavLink to={`${TRAINING_ROUTE}?type=match`}>
                <TrainModeButton typeTrainMode={'match'}>
                    Соответствие
                </TrainModeButton>
            </NavLink>
        </div>
    );
};