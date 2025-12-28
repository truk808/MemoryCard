import { $authHost } from "./axios";

export const addTagToCard = async (cardId: number, tagId: number) => {
    const { data } = await $authHost.post("/api/card-tag", {
        cardId,
        tagId,
    });
    return data;
};

export const getTagsByCard = async (cardId: number) => {
    const { data } = await $authHost.get(`/api/card-tag/card/${cardId}`);
    return data;
};

export const removeTagFromCard = async (cardId: number, tagId: number) => {
    const { data } = await $authHost.delete(
        `/api/card-tag/${cardId}/${tagId}`
    );
    return data;
};
