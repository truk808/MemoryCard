import {Card} from "../../entities/card";

export type TrainingCard = {
    card: Card;
    correct: boolean
}

export type TrainingPayload = {
    typeTraining: string;
    moduleIds: number[];
    cards: TrainingCard[];
    duration: number;
    date: string;
}
