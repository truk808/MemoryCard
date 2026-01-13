import { $host, $authHost } from "./axios";

export const createPublication = async (entityId: number) => {
    const { data } = await $authHost.post('/api/community', {entityId});
    return data;
};

export const getAllPublications = async () => {
    const { data } = await $authHost.get('/api/community');
    return data;
};

export const getPublicationsByUser = async () => {
    const { data } = await $authHost.get('/api/community/user');
    return data;
};

export const importPublication = async (entityId: number) => {
    const { data } = await $authHost.post(`/api/community/copy/${entityId}`);
    return data;
};
