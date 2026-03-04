import {Card} from "../../entities/card";
import {Tag} from "../../entities/tag";
import {CardWithTags} from "../types/entityTypes";
import {CardTag} from "../../entities/cardTag";

export function mergeCardsWithTags(cards: Card[], tags: Tag[], cardTags: CardTag[]): CardWithTags[] {
    const tagMap = new Map<number, Tag>(tags.map(tag => [tag.id, tag]));
    const cardTagMap = new Map<number, Tag[]>();

    for (const ct of cardTags) {
        const tag = tagMap.get(ct.tagId);
        if (!tag) continue;

        if (!cardTagMap.has(ct.cardId)) {
            cardTagMap.set(ct.cardId, []);
        }

        cardTagMap.get(ct.cardId)!.push(tag);
    }

    return cards.map(card => ({
        ...card,
        tags: cardTagMap.get(card.id) ?? []
    }));
}