import {$host, $authHost} from "./axios"

export const createTag = async (
    name: string,

) => {
    const { data } = await $authHost.post('/api/tag', {
        name
    })
    return data
}

export const getTags = async () => {
    const { data } = await $authHost.get('/api/tag')
    return data
}

export const getTagsByUser = async (userId: number) => {
    const { data } = await $authHost.get(`/api/tag/user/${userId}`)
    return data
}

export const updateTag = async (
    id: number,
    payload: { id: number; name: string}) => {
    const { data } = await $authHost.put(`/api/tag/${id}`, payload)
    return data
}

export const deleteTag = async (id: number) => {
    const { data } = await $authHost.delete(`/api/tag/${id}`)
    return data
}
