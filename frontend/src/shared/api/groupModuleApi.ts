import { $authHost } from "./axios";

export const addModuleToGroup = async (
    groupId: number,
    moduleId: number
) => {
    const { data } = await $authHost.post("/api/group-module", {
        groupId,
        moduleId,
    });
    return data;
};

export const getModulesByGroup = async (groupId: number) => {
    const { data } = await $authHost.get(
        `/api/group-module/group/${groupId}`
    );
    return data;
};

export const removeModuleFromGroup = async (
    groupId: number,
    moduleId: number
) => {
    const { data } = await $authHost.delete(
        `/api/group-module/${groupId}/${moduleId}`
    );
    return data;
};
