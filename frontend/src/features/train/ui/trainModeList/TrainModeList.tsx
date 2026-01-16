import React from 'react';
import styles from './TrainModeList.module.scss'
import {TrainModeButton} from "../trainModeButton/TrainModeButton";
import {NavLink} from "react-router-dom";
import {TRAINING_ROUTE} from "../../../../shared/routes/const";

type Props = {
    moduleIds: number[]
}

export const TrainModeList = ({ moduleIds }: Props) => {
    const modulesParam = moduleIds.join(",")

    return (
        <div className={styles.TrainModeList}>
            <NavLink to={`${TRAINING_ROUTE}?type=repetition&modules=${modulesParam}`}>
                <TrainModeButton typeTrainMode={'repetition'}>
                    Повторение
                </TrainModeButton>
            </NavLink>
            <NavLink to={`${TRAINING_ROUTE}?type=memorization&modules=${modulesParam}`}>
                <TrainModeButton typeTrainMode={'memorization'}>
                    Заучивание
                </TrainModeButton>
            </NavLink>
            <NavLink to={`${TRAINING_ROUTE}?type=test&modules=${modulesParam}`}>
                <TrainModeButton typeTrainMode={'test'}>
                    Тест
                </TrainModeButton>
            </NavLink>
            <NavLink to={`${TRAINING_ROUTE}?type=match&modules=${modulesParam}`}>
                <TrainModeButton typeTrainMode={'match'}>
                    Соответствие
                </TrainModeButton>
            </NavLink>
        </div>
    );
};