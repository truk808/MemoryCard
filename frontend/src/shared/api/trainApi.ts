import {$authHost} from "./axios";

export const completeTraining = async (payload: {
    type: string;
    modules: number[];
    cards: { cardId: number; correct: boolean }[];
    duration: number;
}) => {
    const { data } = await $authHost.post('/api/training/complete', payload);
    return data;
};
