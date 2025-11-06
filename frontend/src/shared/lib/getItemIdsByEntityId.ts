export function getRelatedIdsByEntityId<T extends Record<string, number>> (
    entityId: number,
    relationList: T[],
    entityKey: keyof T,
    itemKey: keyof T
): number[] {
    return relationList.filter((relation) => relation[entityKey] === entityId)
        .map((relation) => relation[itemKey]);
}