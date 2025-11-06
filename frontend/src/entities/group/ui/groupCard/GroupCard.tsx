import React, {FC} from 'react';
import styles from './GroupCard.module.scss'
import {Group} from "../../model/slice";
import {NavLink} from "react-router-dom";
import {GlobalSvgSelector, GROUP_ROUTE} from "../../../../shared";
import {GroupWithPublication} from "../../model/types";
import {Publication} from "../../../publication/model/slice";

type GroupCardProps = {
    group: Group | Publication;
    variant?: "default" | "publication";
}


export const GroupCard: FC<GroupCardProps> = ({group, variant='default'}) => {
    const isPublication = variant === 'publication';

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
                    <div className={styles.info}>
                        <div className={styles.nickname_moduleQuantity}>
                            <p className={styles.nickname}>
                                {isPublication && "nickname" in group && (
                                    <p className={styles.nickname}>{group.nickname}</p>
                                )}
                            </p>
                           {/* <p className={styles.moduleQuantity}>
                                модулей: {group.module_quantity}
                            </p>*/}
                        </div>
                        <div className={styles.rating_additions}>
                            {isPublication && "rating_avg" in group && (
                                <div className={styles.rating}>
                                    <div className={styles.icon}>
                                        <GlobalSvgSelector svgName={'star'}/>
                                    </div>
                                    <p>
                                        {group.rating_avg}
                                    </p>
                                </div>
                            )}
                            {isPublication && "additions_count" in group && (
                                <div className={styles.additions}>
                                    <div className={styles.icon}>
                                        <GlobalSvgSelector svgName={'additions'}/>
                                    </div>
                                    <p>
                                        {group.additions_count}
                                    </p>
                                </div>
                            )}
                        </div>


                    </div>
                </div>
            </div>
        </NavLink>

    );
};