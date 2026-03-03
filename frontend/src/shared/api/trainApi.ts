import {$authHost} from "./axios";
import {TrainingPayload} from "../types/trainingPayload";

export const completeTraining = async (payload: TrainingPayload) => {
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

export const getTrainingByGroup = async (groupId: number) => {
    const { data } = await $authHost.get(`/api/training/group/${groupId}`);
    return data;
};