import {Card} from "../../../entities/card";
import {useSelector} from "react-redux";
import {selectCardsByModuleIds} from "../../../entities/training";
import {uniqueAndShuffle} from "../../../shared/utils/uniqueAndShuffle";
import {use, useEffect, useState} from "react";

type TrainingCard = {
    card: Card;
    correct: boolean
}

type TrainingPayload = {
    typeTraining: string;
    moduleIds: number[];
    cards: TrainingCard[];
    duration: number;
    date: string;
}

export function useTraining(typeTraining: string, moduleIds: number[]) {
    const rawCards = useSelector(selectCardsByModuleIds(moduleIds));
    const validCards = rawCards.filter(
        (card): card is Card => card !== undefined
    );
    const cards = uniqueAndShuffle(validCards);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [index, setIndex] = useState<number>(0);
    const [helper, setHelper] = useState(false);
    const [currentCard, setCurrentCard] = useState<Card>(cards[0])
    const [results, setResults] = useState<TrainingPayload | null>(null);
    const [trainingCards, setTrainingCards] = useState<TrainingCard[]>([]);
    const startDate = Date.now();

    const recordAnswer = (card: Card, correct: boolean) => {
        setTrainingCards(prev => [
            ...prev,
            {card, correct},
        ])
        nextCard()
    }

    const nextCard = () => {
        if(cards.length <= index) {
            finishTraining()
        }
        setIndex(prev => prev + 1)
        if(currentCard) setCurrentCard(cards[index])
    }

    const finishTraining = () => {
        const finishResults = {
            typeTraining: typeTraining,
            moduleIds: moduleIds,
            cards: trainingCards,
            duration: (Date.now() - startDate) / 100,
            date: new Date().toLocaleString("ru-RU"),
        }

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
