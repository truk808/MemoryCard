import {Repetition} from "./repetition/Repetition";
import {FC, useEffect, useState} from "react";
import {useTraining} from "../model/useTrainingLogic";
import {ModalResult} from "./modalResult/ModalResult";

interface TrainingSessionProps {
    type: string;
    moduleIds: number[];
}

export const  TrainingSession: FC<TrainingSessionProps> = ({type, moduleIds}) => {
    const training = useTraining(type, moduleIds);

    if (training.isOpenModal && training.results) {
        return <ModalResult
            isOpen={training.isOpenModal}
            close={() => {}}
            type={training.results.typeTraining}
            cardsCount={training.results.cards.length}
            wrongCount={training.results.cards.filter(trainingCard => !trainingCard.correct).length}
            duration={training.results.duration}
            date={training.results.date}
        />
    }

    switch (type) {
        case "repetition":
            return (
                <Repetition
                    currentCard={training.currentCard}
                    recordAnswer={training.recordAnswer}
                    index={training.index}
                    cards={training.cards}
                />
            );
        // case "test":
        //     return (
        //         <Test
        //             currentCard={training.currentCard}
        //             nextCard={training.nextCard}
        //             recordAnswer={training.recordAnswer}
        //             cards={training.cards}
        //             setHelper={() => training.setHelper}
        //             helper={training.helper}
        //         />
        //     );
        // case "match":
        //     return (
        //         <Match
        //         />
        //     );
        // case "memorization":
        //     return (
        //         <Memorize
        //             currentCard={training.currentCard}
        //             nextCard={training.nextCard}
        //             recordAnswer={training.recordAnswer}
        //             cards={training.cards}
        //             setHelper={() => training.setHelper}
        //             helper={training.helper}
        //         />
        //     );
        default:
            return <div>Неверный тип тренировки</div>;
    }
};
