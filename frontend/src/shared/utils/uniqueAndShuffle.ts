export function uniqueAndShuffle<T extends { id: string | number }>(
    array: T[]
): T[] {
    const unique = Array.from(
        new Map(array.map(item => [item.id, item])).values()
    );

    for (let i = unique.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [unique[i], unique[j]] = [unique[j], unique[i]];
    }

    return unique;
}
