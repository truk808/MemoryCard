import {Repetition} from "./repetition/Repetition";
import {FC, useEffect, useState} from "react";
import {useTraining} from "../model/useTrainingLogic";
import {ModalResult} from "./modalResult/ModalResult";
import {Card} from "../../../entities/card";
import {Test} from "./test/Test";
import {Memorize} from "./memorize/Memorize";
import {Match} from "./match/Match";

interface TrainingSessionProps {
    type: string;
    cards: Card[];
    moduleIds: number[];
    entityType?: 'module' | 'group'
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
        // переделать
        return <ModalResult
            isOpen={isModalOpen}
            close={() => {}}
            type={type}
            cardsCount={training.cards.length}
            wrongCount={Object.values(training.results).filter(v => !v).length}
            duration={training.finishResults?.duration ?? 0}
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
