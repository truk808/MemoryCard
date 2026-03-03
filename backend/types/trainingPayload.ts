export type TrainingCard = {
    card: CardType;
    correct: boolean
}

export type TrainingPayload = {
    typeTraining: string;
    moduleIds: number[];
    cards: TrainingCard[];
    duration: number;
    date: string;
}

export interface CardType {
    id: number;
    term: string;
    meaning: string;
    example_sentence: string;
    level: number;
    userId: number;
}