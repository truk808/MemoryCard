import React, { FC } from 'react';
import styles from './TrainModeButton.module.scss';
import { TrainSvgSelector } from '../../../../shared/assets';

interface TrainModeButtonProps {
    typeTrainMode: 'repetition' | 'memorization' | 'test' | 'match';
    children?: React.ReactNode;
}

export const TrainModeButton: FC<TrainModeButtonProps> = ({
                                                              typeTrainMode,
                                                              children,
                                                          }) => {
    return (
        <button className={styles.button}>
            <div className={styles.icon}>
                <TrainSvgSelector svgName={typeTrainMode} />
            </div>
            <div className={styles.text}>{children}</div>
        </button>
    );
};
