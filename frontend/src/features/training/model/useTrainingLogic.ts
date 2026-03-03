import {Card} from "../../../entities/card";
import {useSelector} from "react-redux";
import {selectCardsByModuleIds} from "../../../entities/training";
import {useEffect, useState} from "react";
import {TrainingCard, TrainingPayload} from "../../../shared/types/trainingPayload";
import {completeTraining} from "../../../shared/api/trainApi";
import {RootState} from "../../../app/store";

export function useTraining(typeTraining: string, moduleIds: number[]) {
    const rawCards = useSelector((state: RootState) => {
           return selectCardsByModuleIds(state, moduleIds)
        }
    );
    const validCards = rawCards.filter(
        (card): card is Card => card !== undefined
    );
    const cards = validCards;
    console.log('useTraining render');
    // console.log(rawCards)
    // console.log(cards)

    // console.log('useTraining', cards);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [index, setIndex] = useState<number>(0);
    const [helper, setHelper] = useState(false);
    const [currentCard, setCurrentCard] = useState<Card>(cards[0])
    const [results, setResults] = useState<TrainingPayload | null>(null);
    const [trainingCards, setTrainingCards] = useState<TrainingCard[]>([]);
    const startDate = Date.now();

    const recordAnswer = (card: Card, correct: boolean) => {
        setTrainingCards(prev => {
            const update = [...prev, {card, correct}]
            const nextIndex = index + 1;
            if (cards.length <= nextIndex) {
                finishTraining(update)
            } else {
                setCurrentCard(cards[nextIndex])
                setIndex(nextIndex)
            }
            return update;
        })
    }

    const finishTraining = (finalCards: TrainingCard[]) => {
        const finishResults = {
            typeTraining: typeTraining,
            moduleIds: moduleIds,
            cards: finalCards,
            duration: (Date.now() - startDate) / 100,
            date: new Date().toLocaleString("ru-RU"),
        }
        console.log('finishResults', finishResults.cards)
        completeTraining(finishResults)
        setResults(finishResults);
        setIsOpenModal(true)
    }

    return {
        cards,
        currentCard,
        index,
        helper,
        setHelper,
        isOpenModal,
        results,
        recordAnswer,
    }
}
