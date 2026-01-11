import { $authHost } from "./axios";

// переделать
export const getProgressByModule = async (moduleId: number) => {
    const { data } = await $authHost.get(`/api/linear-graph/module/${moduleId}`);
    return data;
};

export const getProgressByGroup = async (groupId: number) => {
    const { data } = await $authHost.get(`/api/linear-graph/group/${groupId}`);
    return data;
};
