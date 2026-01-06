import {$host, $authHost} from "./axios"

export const createModule = async (name: string, icon: string) => {
    const { data } = await $authHost.post('/api/module', {
        name,
        icon,
    })
    return data
}

export const getModules = async () => {
    const { data } = await $authHost.get('/api/module')
    return data
}

export const getModulesByUser = async (userId: number) => {
    const { data } = await $authHost.get(`/api/module/user/${userId}`)
    console.log('data', data)
    return data
}

export const updateModule = async (id: number, payload: { name?: string, icon?:string }) => {
    const { data } = await $authHost.put(`/api/module/${id}`, payload)
    return data
}

export const deleteModule = async (id: number) => {
    const { data } = await $authHost.delete(`/api/module/${id}`)
    return data
}
