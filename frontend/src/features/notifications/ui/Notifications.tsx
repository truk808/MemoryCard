import React from 'react';
import styles from './Logo.module.scss';
import {GlobalSvgSelector} from "../../../shared/assets";
import useNotification from "../model/useNotification";

export const Notification = () => {
    const {
        onClick,
    } = useNotification()

    return (
        <div
            onClick={onClick}
        >
            <GlobalSvgSelector svgName={'notification'} />
        </div>
    );
};
