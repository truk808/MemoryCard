import {Repetition} from "./repetition/Repetition";
import {Match} from "./match/Match";
import {Test} from "./test/Test";
import {Memorize} from "./memorize/Memorize";
import {FC, useEffect, useState} from "react";
import {Card} from "../../../entities";
import {useTraining} from "../model/hooks/useTrainingLogic";
import {ModalResult} from "./modalResult/ModalResult";

interface TrainingSessionProps {
    type: string;
    cards: Card[];
    moduleIds: number[];
}

export const  TrainingSession: FC<TrainingSessionProps> = ({type, cards, moduleIds}) => {
    const training = useTraining(cards, type, moduleIds);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (training.isFinish) {
            setIsModalOpen(true);
        }
    }, [training.isFinish]);

    if (isModalOpen) {
        const correctCount = Object.values(training.results).filter(Boolean).length;
        const wrongCount = cards.length - correctCount;

        return <ModalResult
            isOpen={isModalOpen}
            close={() => setIsModalOpen(false)}
            type={type}
            cardsCount={cards.length}
            wrongCount={wrongCount}
            duration={0}
            date={new Date().toLocaleString("ru-RU")}
        />
    }

    switch (type) {
        case "repetition":
            return (
                <Repetition
                    currentCard={training.currentCard}
                    nextCard={training.nextCard}
                    recordAnswer={training.recordAnswer}
                    index={training.index}
                    cards={training.cards}
                />
            );
        case "test":
            return (
                <Test
                    currentCard={training.currentCard}
                    nextCard={training.nextCard}
                    recordAnswer={training.recordAnswer}
                    cards={training.cards}
                    setHelper={() => training.setHelper}
                    helper={training.helper}
                />
            );
        case "match":
            return (
                <Match
                    // cards={training.cards}
                    // finish={training.finish}
                />
            );
        case "memorization":
            return (
                <Memorize
                    currentCard={training.currentCard}
                    nextCard={training.nextCard}
                    recordAnswer={training.recordAnswer}
                    cards={training.cards}
                    setHelper={() => training.setHelper}
                    helper={training.helper}
                />
            );
        default:
            return <div>Неверный тип тренировки</div>;
    }
};
