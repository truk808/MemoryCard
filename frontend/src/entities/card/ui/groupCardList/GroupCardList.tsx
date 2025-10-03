import React, {FC} from 'react';
import styles from './GroupCardList.module.scss'
import {Card} from "../card/Card";
import {Group} from "../../model/slice";

interface GroupCardListProps {
    isShow?: boolean;
    items: Group[];
}

export const GroupCardList: FC<GroupCardListProps> = ({isShow, items}) => {
    return (
        <div className={[styles.GroupCardList, isShow && styles.active].join(' ')}>
            {items.map(group => (
                <Card key={group.id} group={group} />
            ))}
        </div>
    )
};
