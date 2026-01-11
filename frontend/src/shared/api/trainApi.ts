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

export const getTrainingByUser = async () => {
    const { data } = await $authHost.get('/api/training/user');
    return data;
};

export const getTrainingByModule = async (moduleId: number) => {
    const { data } = await $authHost.get(`/api/training/module/${moduleId}`);
    return data;
};