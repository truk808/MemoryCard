import React, {FC} from 'react';
import styles from './TermCard.module.scss'
import {Card} from '../../model/slice'

interface CardProps {
    card: Card
}

export const TermCard: FC<CardProps> = ({card}) => {

    return (
        <div className={styles.card}>
            <div className={styles.cardInfo}>
                <h2 className={styles.title}>
                    {card.name}
                </h2>
                <p className={styles.description}>
                    {card.description}
                </p>
            </div>
            <div className={styles.tagList}>
                {card.tags.map(tag => (
                    <p className={styles.tag}>
                        {tag}
                    </p>
                ))}
            </div>
        </div>
    );
};