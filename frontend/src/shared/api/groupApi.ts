import {$host, $authHost} from "./axios"

export const createGroup = async (name: string, description: string) => {
    const { data } = await $authHost.post('/api/group', {
        name,
        description,
        img: '',
    })
    return data
}

export const getGroups = async () => {
    const { data } = await $authHost.get('/api/group')
    return data
}

export const getGroupsByUser = async (userId: number) => {
    const { data } = await $authHost.get(`/api/group/user/${userId}`)
    return data
}

export const updateGroup = async (id: number,payload: { name?: string; description?: string }) => {
    const { data } = await $authHost.put(`/api/group/${id}`, payload)
    return data
}

export const deleteGroup = async (id: number) => {
    const { data } = await $authHost.delete(`/api/group/${id}`)
    return data
}
