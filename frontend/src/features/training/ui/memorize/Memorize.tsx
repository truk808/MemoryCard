import React, {FC, useMemo, useState} from 'react';
import styles from './Memorize.module.scss';
import {GlobalSvgSelector} from "../../../../shared/assets";
import {Card} from "../../../../entities/card";

interface MemorizeProps {
    currentCard: Card
    nextCard: () => void,
    recordAnswer: (cardId: number, correct: boolean) => void ,
    cards: Card[],
    helper: boolean,
    setHelper: (flag: boolean) => void,
}

export const Memorize: FC<MemorizeProps> = ({nextCard, cards, currentCard, recordAnswer, helper, setHelper}) => {
    const [isHelper, setIsHelper] = useState(false);

    const options = useMemo(() => {
        const all = cards.map(card => card.meaning);
        const wrong = all.filter(m => m !== currentCard.meaning).sort(() => 0.5 - Math.random()).slice(0, 3);
        return [...wrong, currentCard.meaning].sort(() => 0.5 - Math.random());
    }, [currentCard]);

    function onclick(option: string) {
        if (option === currentCard.meaning) {
            nextCard();
        } else {
            console.log('неправильно!')
        }
    }

    return (
        <div className={styles.memorize}>
            <div className={styles.card}>
                <div className={styles.helper} onClick={() =>setIsHelper(prevState => !prevState)}>
                    <GlobalSvgSelector svgName={'lamp'} />
                </div>
                <h1 className={styles.title}>
                    { isHelper ? currentCard.example_sentence : currentCard.term}
                </h1>
            </div>

            <div className={styles.answers}>
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={styles.answerCard}
                        onClick={() => onclick(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};
