import {$host, $authHost} from "./axios"

export const createCard = async (
    term: string,
    meaning: string,
    example_sentence: string,
) => {
    const { data } = await $authHost.post('/api/card', {
        term,
        meaning,
        example_sentence,
    })
    return data
}

export const getCards = async () => {
    const { data } = await $authHost.get('/api/card')
    return data
}

export const getCardsByUser = async (userId: number) => {
    const { data } = await $authHost.get(`/api/card/user/${userId}`)
    return data
}

export const updateCard = async (
    id: number,
    payload: { id: number; term: string; meaning: string; example_sentence: string; level: number }) => {
    const { data } = await $authHost.put(`/api/card/${id}`, payload)
    return data
}

export const deleteCard = async (id: number) => {
    const { data } = await $authHost.delete(`/api/card/${id}`)
    return data
}
