import React, {FC} from 'react';
import styles from './TermCard.module.scss'
import {Card} from '../../model/slice'
import {Tooltip, TruncatedText} from "../../../../shared";
import {Tag} from "../../../tag/model/slice";
import {TagBadge} from "../../../tag/ui/tag/Tag";
import {CardWithTags} from "../../model/types";

interface CardProps {
    card: CardWithTags;
}

export const TermCard: FC<CardProps> = ({card}) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardInfo}>
                <h2 className={styles.title}>
                    {card.name}
                </h2>
                <p>
                    {/*<Tooltip content={card.description}>*/}
                        <TruncatedText maxLength={200}>
                            {card.description}
                        </TruncatedText>
                    {/*</Tooltip>*/}
                </p>
            </div>
            <div className={styles.tagList}>
                {card.tags.map(tag => (
                    <TagBadge tag={tag} />
                ))}
            </div>
        </div>
    );
};

// <TruncatedText
//     className={'cnbkb'}
//     text={'Текст Текст Текст Текст'}
//     maxLength={100}
//     maxLines={2}
// />
