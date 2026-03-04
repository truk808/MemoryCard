export function getRelatedIdsByEntityId<T extends Record<string, number>>(
    entityIds: number | number[],
    relationList: T[],
    entityKey: keyof T,
    itemKey: keyof T
): number[] {
    const idsArray = Array.isArray(entityIds)
        ? entityIds
        : [entityIds];

    return relationList
        .filter(relation => idsArray.includes(relation[entityKey]))
        .map(relation => relation[itemKey]);
}