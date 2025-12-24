import React, {useState} from "react";
import styles from './Repetition.module.scss'
import {Card} from "../../../../entities";
import {FC} from "react";
import {GlobalSvgSelector} from "../../../../shared";

interface RepetitionProps {
    currentCard: Card
    nextCard: () => void,
    recordAnswer: (cardId: number, correct: boolean) => void ,
    cards: Card[],
    index: number,
}

export const Repetition: FC<RepetitionProps> = ({ currentCard, nextCard, recordAnswer, index, cards }) => {
    const [flipped, setFlipped] = useState(false);
    const [isHelper, setIsHelper] = useState(false);

    const handleKnow = (know: boolean) => {
        recordAnswer(currentCard.id, know);
        nextCard();
    };

    return (
        <div className={styles.repetition}>
            <div className={styles.card}>
                <div
                    className={styles.helper}
                    onClick={() =>setIsHelper(prevState => !prevState)}
                >
                    <GlobalSvgSelector svgName={'lamp'}/>
                </div>
                <h1
                    className={styles.title}
                    onClick={() => setFlipped(prevState => !prevState)}
                >
                    {isHelper ?
                        currentCard?.meaning
                        :
                        flipped ?
                            currentCard?.meaning
                            :
                            currentCard?.term
                    }
                </h1>
                <div className={styles.arrowsContainer}>
                    <div
                        className={styles.arrowLeft}
                        onClick={() => handleKnow(false)}
                    >
                        <GlobalSvgSelector svgName={'straight-arrow-left'}/>
                    </div>
                    <div
                        className={styles.arrowRight}
                        onClick={() => handleKnow(true)}
                    >
                        <GlobalSvgSelector svgName={'straight-arrow-right'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
