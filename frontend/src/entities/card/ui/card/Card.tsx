import React, {FC} from 'react';
import styles from './GroupCard.module.scss'
import {Group} from "../../model/slice";

interface GroupCardProps {
    group: Group;
}

export const Card: FC<GroupCardProps> = ({group}) => {

    return (
        <div className={styles.card}>
            <div className={styles.imgWrapper}>
                <img className={styles.img} src={group.img} alt=""/>
            </div>
            <div className={styles.cardInfo}>
                <h2 className={styles.title}>
                    {group.name}
                </h2>
                <p className={styles.statistic}>
                    много модулей
                </p>
            </div>
        </div>
    );
};