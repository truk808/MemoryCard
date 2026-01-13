import { $authHost } from "./axios";

// переделать
export const getProgressByModule = async (moduleIds: number[]) => {
    const ids = moduleIds.join(",");

    const { data } = await $authHost.get(`/api/linear-graph/module`, { params: { ids } });

    return data;
};
