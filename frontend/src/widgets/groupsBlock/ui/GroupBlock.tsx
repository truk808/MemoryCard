import React from 'react';
import styles from './GrroupBlock.module.scss'

export const GroupBlock = () => {
    return (
        <div className={styles.groupBlock}>
            <div className=''>
                <div className={styles.groupBlock_iconText}>
                    <div className={styles.groupBlock_icon}>

                    </div>
                    <div className={styles.groupBlock_text}>
                        М
                    </div>
                </div>
            </div>
            <div> groupList </div>
        </div>
    );
};