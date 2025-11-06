import React, {FC} from 'react';
import styles from './Test.module.scss';
import { GlobalSvgSelector, Input } from '../../../../shared';
import {Card} from "../../../../entities";

interface TestProps {
    currentCard: Card
    nextCard: () => void,
    recordAnswer: (cardId: number, correct: boolean) => void ,
    cards: Card[],
    helper: boolean,
    setHelper: (flag: boolean) => void,
}

export const Test: FC<TestProps> = ({setHelper, helper, currentCard, nextCard, cards, recordAnswer,}) => {
    const [answer, setAnswer] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            if(currentCard.name === answer) {
                nextCard()
            } else {
                console.log('неправилно')
            }
        }
    }

    return (
        <div className={styles.test}>
            <div className={styles.card}>
                <div className={styles.helper}>
                    <GlobalSvgSelector svgName={'lamp'} />
                </div>
                <h1 className={styles.title}>
                    { helper ? currentCard.name : currentCard.description }
                </h1>
            </div>

            <div className={styles.inputContainer}>
                <Input
                    value={answer}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Введите термин"
                />
            </div>
        </div>
    );
};
