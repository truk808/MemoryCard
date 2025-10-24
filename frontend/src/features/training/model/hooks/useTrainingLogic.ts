import { useState, useRef } from "react";
import { Card } from "../../../../entities";

export interface TrainingResult {
    [cardId: number]: boolean;
}

export interface TrainingPayload {
    type: string | null;
    modules: number[];
    cards: { id: number; correct: boolean }[];
    duration: number;
}

export function useTraining(cards: Card[], type: string | null, modules: number[]) {
    const [index, setIndex] = useState(0);
    const [results, setResults] = useState<TrainingResult>({});
    const [helper, setHelper] = useState(false);
    const [isFinish, setIsFinish] = useState(false);

    const startTime = useRef(Date.now());

    const currentCard = cards[index];

    const recordAnswer = (cardId: number, correct: boolean): void => {
        setResults((prev) => ({ ...prev, [cardId]: correct }));
    };

    const nextCard = (): void => {
        if (index < cards.length - 1) {
            setIndex((prev) => prev + 1);
        } else {
            finish();
        }
    };

    const calcLevelChange = (card: Card): number => {
        const correct = results[card.id];
        if (correct === undefined) return card.level;
        return correct
            ? Math.min(card.level + 1, 3)
            : Math.max(card.level - 1, 0);
    };

    const finish = (): void => {
        const duration = Math.floor((Date.now() - startTime.current) / 1000);
        const payload: TrainingPayload = {
            type,
            modules,
            cards: Object.entries(results).map(([id, correct]) => ({
                id: Number(id),
                correct,
            })),
            duration,
        };
        console.log("Training finished:", payload);
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
    };
}
