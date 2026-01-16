import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './GroupCard.module.scss';
import {GROUP_ROUTE} from "../../../../shared/routes/const";
import {TruncatedText} from "../../../../shared/ui";
import {GlobalSvgSelector} from "../../../../shared/assets";
import {Group} from "../../model/types";

type GroupCardProps = {
    group: Group;
    variant?: "default" | "publication";
    onDownload?: (id: number) => void;
}

export const GroupCard: FC<GroupCardProps> = ({ group, variant='default', onDownload }) => {
    const isPublication = variant === 'publication';
    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('download');
        if (onDownload) {
            onDownload(group.id)
        }
    };

    return (
        <div className={styles.cardWrapper}>
            <NavLink
                to={`${GROUP_ROUTE}/${group.id}`}
                className={styles.navLink}
            >
                <div className={styles.card}>
                    <div
                        className={styles.imgWrapper}
                        style={{
                            backgroundImage: `url(${process.env.REACT_APP_API_URL}${group.img})`
                        }}
                    />
                    <div className={styles.cardInfo}>
                        <h2 className={styles.title}>
                            <TruncatedText maxLength={35}>
                                {group.name}
                            </TruncatedText>
                        </h2>
                    </div>
                </div>
            </NavLink>

            {isPublication && (
                <div className={styles.overlay}>
                    <button className={styles.downloadBtn} onClick={onClick}>
                        <GlobalSvgSelector svgName="download" />
                        Скачать
                    </button>
                </div>
            )}
        </div>
    );
};
