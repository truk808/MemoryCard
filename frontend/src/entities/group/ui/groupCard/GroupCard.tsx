import React, {FC} from 'react';
import styles from './GroupCard.module.scss'
import {Group} from "../../model/slice";
import {NavLink} from "react-router-dom";
import {GROUP_ROUTE} from "../../../../shared";

interface GroupCardProps {
    group: Group;
}

export const GroupCard: FC<GroupCardProps> = ({group}) => {

    return (
        <NavLink to={`${GROUP_ROUTE}/${group.id}`}>
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
        </NavLink>

    );
};