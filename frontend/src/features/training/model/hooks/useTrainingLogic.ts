import {useEffect, useMemo, useRef, useState} from "react";
import {Card} from "../../../../shared";
import {completeTraining} from "../../../../shared/api/trainApi";
import {log} from "node:util";
import {useSelector} from "react-redux";
import {selectAllModuleCards} from "../../../../entities/moduleCard/model/selectModuleCards";

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
        const newResults = cardId !== undefined && correct !== undefined
            ? { ...results, [cardId]: correct }
            : results;

        if (index < cards.length - 1) {
            setResults(newResults);
            setIndex(prev => prev + 1);
        } else {
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

    const moduleCards = useSelector(selectAllModuleCards);

    const cardToModule = useMemo(() => {
        const map = new Map<number, number>();

        moduleCards.forEach(mc => {
            map.set(mc.cardId, mc.moduleId);
        });

        return map;
    }, [moduleCards]);


    const finish = (finalResults?: TrainingResult) => {
        const duration = Math.floor((Date.now() - startTime.current) / 1000);
        const resultsToUse = finalResults ?? results;

        const cardsByModule: Record<number, { cardId: number; correct: boolean }[]> = {};

        Object.entries(resultsToUse).forEach(([cardIdStr, correct]) => {
            const cardId = Number(cardIdStr);
            const moduleId = cardToModule.get(cardId);

            if (!moduleId) return;

            if (!cardsByModule[moduleId]) {
                cardsByModule[moduleId] = [];
            }

            cardsByModule[moduleId].push({
                cardId,
                correct,
            });
        });

        Object.entries(cardsByModule).forEach(([moduleId, cards]) => {
            completeTraining({
                type,
                modules: [Number(moduleId)],
                cards,
                duration,
            });
        });

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
