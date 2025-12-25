import React, {FC} from 'react';
import styles from './Tag.module.scss'
import {Tag} from "../../../../shared";

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