import React, {FC, ReactNode} from 'react';
import styles from './Section.module.scss'
import {Button, CardList, GlobalSvgSelector} from "../../index";

interface SectionBlockProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    features?: React.ReactNode[];
    isShowContent?: boolean;
    setIsShowContent?: (isShow: boolean) => void;
}

export const Section: FC<SectionBlockProps> = ({children,
                                                   title,
                                                   description,
                                                   features,
                                                   isShowContent=true,
                                                   setIsShowContent}) => {
    return (
        <section className={styles.sectionBlock}>
            <div className={styles.sectionBlockInfo}>
                <div className={styles.top}>
                    <div className={styles.title}>
                        {
                            setIsShowContent !== undefined &&
                            <div
                                className={[styles.icon, isShowContent && styles.active].join(' ')}
                                onClick={() => setIsShowContent(!isShowContent)}
                            >
                                <GlobalSvgSelector svgName={'arrow-down'}/>
                            </div>
                        }
                        {title}
                    </div>
                    <div className={styles.featuresList}>
                        {
                            features?.map((item, index) => (
                                item
                            ))
                        }
                    </div>
                </div>
                <div className={styles.description}>
                    {description}
                </div>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </section>
    );
};


// <section className={styles.sectionBlock}>
//     <div className={styles.sectionBlockContainer}>
//         <div className={styles.iconText}>
//             <div
//                 className={[styles.icon, isShow && styles.active].join(' ')}
//                 onClick={() => setIsShow(prev => !prev)}
//             >
//                 <GlobalSvgSelector svgName={'arrow-down'}/>
//             </div>
//             <h1 className={styles.title}>
//                 {title}
//             </h1>
//         </div>
//         <div className={styles.buttonWrapper}>
//             <Button color={'blue'}>
//                 Создать группу
//             </Button>
//         </div>
//     </div>
//     <CardList
//         items={items}
//         renderItem={renderItem}
//         isShow={isShow}
//     />
// </section>
