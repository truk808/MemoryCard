import React from 'react';
import styles from './DictionaryPage.module.scss'
import {Section} from "../../../widgets";
import {Button, CardList} from "../../../shared";
import {selectAllCards, TermCard} from "../../../entities";
import {CardManager} from "../../../features";
import {useSelector} from "react-redux";
import {TagManager} from "../../../features/tagManager/ui/TagManager";

export const DictionaryPage = () => {
    const [isOpenModuleManager, setIsOpenModuleManager] = React.useState(false);
    const [isOpenTagManager, setIsOpenTagManager] = React.useState(false);
    const termCards = useSelector(selectAllCards);



    return (
        <div className={styles.dictionaryPage}>
            <TagManager
                mode={'create'}
                isOpen={isOpenTagManager}
                closeModal={() => setIsOpenTagManager(false)}
            />
            <CardManager
                mode={'create'}
                isOpen={isOpenModuleManager}
                closeModal={() => setIsOpenModuleManager(false)}
            />
            <div className={styles.content}>
                {/*<Search/>*/}
                <Section
                    title={'Словарь'}
                    features={
                        [
                            <Button
                                color={'blue'}
                                onClick={() => {setIsOpenTagManager(true)}}
                            >
                                Тег
                            </Button>,
                            <Button
                                color={'blue'}
                                onClick={() => {setIsOpenModuleManager(true)}}
                            >
                                Добавить карточку
                            </Button>,
                        ]
                    }
                >
                    <CardList
                        items={termCards}
                        renderItem={(card) => <TermCard card={card}/>}
                    />
                </Section>
            </div>
            <div className={styles.translator}>

            </div>
        </div>
    );
};

// <div className={styles.dictionaryPage}>
//     <div className={styles.content}>
//         <div className={styles.top}>
//             <div className={styles.title}>
//
//             </div>
//             <div className={styles.buttonContainer}>
//
//             </div>
//         </div>
//         <FilterBar/>
//         <div className={styles.cardList}>
//             <CardList
//                 isShow={true}
//                 items={cards}
//                 renderItem={(card) =>
//                     <TermCard card={card}/>}
//             />
//         </div>
//     </div>
//     <div className={styles.translator}>
//         Переводчик
//     </div>
// </div>