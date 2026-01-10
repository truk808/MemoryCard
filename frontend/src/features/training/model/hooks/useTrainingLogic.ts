import {useEffect, useRef, useState} from "react";
import {Card} from "../../../../shared";
import {completeTraining} from "../../../../shared/api/trainApi";
import {log} from "node:util";

export interface TrainingResult {
    [cardId: number]: boolean;
}

export interface TrainingPayload {
    type: string;
    modules: number[];
    cards: { cardId: number; correct: boolean }[];
    duration: number;
}

export function useTraining(cards: Card[], type: string, modules: number[]) {
    const [index, setIndex] = useState(0);
    const [results, setResults] = useState<TrainingResult>({});
    const [helper, setHelper] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [finishResults, setFinishResults] = useState<TrainingPayload>();

    const startTime = useRef(Date.now());

    const currentCard = cards[index];

    // console.log(currentCard)

    const recordAnswer = (cardId: number, correct: boolean): void => {
        setResults((prev) => ({...prev, [cardId]: correct}));
        // console.log(cardId);
        // console.log(results);
    };

    const nextCard = (cardId?: number, correct?: boolean) => {
        // Сохраняем новый результат в переменную
        const newResults = cardId !== undefined && correct !== undefined
            ? { ...results, [cardId]: correct }
            : results;

        if (index < cards.length - 1) {
            setResults(newResults); // обновляем state
            setIndex(prev => prev + 1);
        } else {
            // последняя карточка — используем newResults
            finish(newResults);
        }
    };


    const calcLevelChange = (card: Card): number => {
        const correct = results[card.id];
        if (correct === undefined) return card.level;
        return correct
            ? Math.min(card.level + 1, 3)
            : Math.max(card.level - 1, 0);
    };

    const finish = (finalResults?: TrainingResult) => {
        const duration = Math.floor((Date.now() - startTime.current) / 1000);
        const payload: TrainingPayload = {
            type,
            modules,
            cards: Object.entries(finalResults ?? results).map(([cardId, correct]) => ({
                cardId: Number(cardId),
                correct,
            })),
            duration,
        };
        console.log("Training finished:", payload);
        completeTraining(payload);
        setFinishResults(payload);
        setIsFinish(true);
    };


    return {
        cards,
        currentCard,
        index,
        nextCard,
        recordAnswer,
        finish,
        results,
        calcLevelChange,
        helper,
        setHelper,
        isFinish,
        finishResults,
    };
}
