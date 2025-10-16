import React, {FC} from 'react';
import type {Tag} from '../../../index'
import styles from './Tag.module.scss'

interface TagProps {
    tag: Tag;
}

export const TagBadge: FC<TagProps> = ({tag}) => {
    return (
        <div className={styles.tag}>
            {tag.name}
        </div>
    );
};