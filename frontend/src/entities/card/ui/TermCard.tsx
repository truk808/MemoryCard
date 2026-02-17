import React, {FC} from 'react';
import styles from './TermCard.module.scss';
import { TagBadge } from "../../tag";
import {GlobalSvgSelector} from "../../../shared/assets";
import {TruncatedText} from '../../../shared/ui';

import {CardWithTags} from "../../../shared/types/entityTypes";

interface CardProps {
    card: CardWithTags;
    onDelete: () => void;
    onEdit: () => void;
}

export const TermCard: FC<CardProps> = ({ card, onEdit, onDelete }) => {

    return (
        <div className={styles.cardWrapper}>
            <div className={styles.card}>
                <div className={styles.cardInfo}>
                    <h2 className={styles.title}>{card.term}</h2>
                    <p className={styles.description}>
                        <TruncatedText maxLength={50}>{card.meaning}</TruncatedText>
                    </p>
                    <div className={styles.tagList}>
                        {card.tags.map(tag => (
                            <TagBadge key={tag.id} tag={tag} />
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.overlay}>
                <div className={styles.iconButton} onClick={onEdit}>
                    <GlobalSvgSelector svgName={'edit'} />
                </div>
                <div className={styles.iconButton} onClick={onDelete}>
                    <GlobalSvgSelector svgName={'delete'} />
                </div>
            </div>
        </div>
    );
};
