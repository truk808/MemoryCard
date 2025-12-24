import React, {FC, useEffect} from 'react';
import styles from './TermCard.module.scss';
import { GlobalSvgSelector, TruncatedText } from "../../../../shared";
import { TagBadge } from "../../../tag/ui/tag/Tag";
import { CardWithTags } from "../../model/types";

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
                        <TruncatedText maxLength={200}>{card.meaning}</TruncatedText>
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
