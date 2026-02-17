import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './GroupCard.module.scss';
import { GROUP_ROUTE } from '../../../shared/routes/const';
import { TruncatedText } from '../../../shared/ui';
import { Group } from '../model/types';

type GroupCardProps = {
    group: Group;
    variant?: 'default' | 'publication';
    onDownload?: (id: number) => void;
};

export const GroupCard: FC<GroupCardProps> = ({
                                                  group,
                                                  variant = 'default',
                                                  onDownload,
                                              }) => {
    const isPublication = variant === 'publication';
    const hasImage = Boolean(group.img);

    const handleDownload = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDownload?.(group.id);
    };

    return (
        <NavLink
            to={`${GROUP_ROUTE}/${group.id}`}
            className={`${styles.card} ${isPublication ? styles.publication : ''}`}
        >
            <div className={styles.imageWrapper}>
                {hasImage ? (
                    <img src={`${process.env.REACT_APP_API_URL}${group.img}`} alt={group.name} />
                ) : (
                    <div className={styles.imagePlaceholder} />
                )}
            </div>

            <div className={`heading-xl ${styles.info}`}>
                <TruncatedText maxLength={20} className={styles.title}>
                    {group.name}
                </TruncatedText>

                {/*<TruncatedText lines={3} className={styles.description}>*/}
                {/*    {group.description}*/}
                {/*</TruncatedText>*/}
            </div>

            {isPublication && (
                <div className={styles.overlay}>
                    <button className={styles.downloadBtn} onClick={handleDownload}>
                        Скачать
                    </button>
                </div>
            )}
        </NavLink>
    );
};
