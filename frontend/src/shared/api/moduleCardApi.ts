import { $authHost } from "./axios";

export const addCardToModule = async (
    moduleId: number,
    cardId: number
) => {
    const { data } = await $authHost.post("/api/module-card", {
        moduleId,
        cardId,
    });
    return data;
};

export const getCardsByModule = async (moduleId: number) => {
    const { data } = await $authHost.get(
        `/api/module-card/module/${moduleId}`
    );
    return data;
};

export const removeCardFromModule = async (
    moduleId: number,
    cardId: number
) => {
    const { data } = await $authHost.delete(
        `/api/module-card/${moduleId}/${cardId}`
    );
    return data;
};
