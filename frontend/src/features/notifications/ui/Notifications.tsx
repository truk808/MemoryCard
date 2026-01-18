import React from 'react';
import styles from './Notifications.module.scss';
import {GlobalSvgSelector} from "../../../shared/assets";
import useNotification from "../model/useNotification";

export const Notification = () => {
    const {
        onClick,
    } = useNotification()

    return (
        <div
            className='medium'
            onClick={onClick}
        >
            <GlobalSvgSelector svgName={'notification'} />
        </div>
    );
};
