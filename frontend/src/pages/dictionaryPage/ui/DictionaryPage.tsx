import React from 'react';
import styles from './DictionaryPage.module.scss'
import {Section} from "../../../widgets";
import {Button, CardList} from "../../../shared";
import {TermCard, useTermCardSelector} from "../../../entities";
import {Search} from "../../../features";

export const DictionaryPage = () => {
    const {termCards, termCardsDispatch} = useTermCardSelector()

    return (
        <div className={styles.dictionaryPage}>
            <div className={styles.content}>
                <Search/>
                <Section
                    title={'Словарь'}
                    features={[<Button color={'blue'}> Добавить карточку </Button>]}
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