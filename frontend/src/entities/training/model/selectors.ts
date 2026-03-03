import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

export const selectCardsByModuleIds = createSelector(
    [
        (state: RootState) => state.card.cards,
        (state: RootState) => state.moduleCard.moduleCards,
        (_: RootState, moduleIds: number[]) => moduleIds,
    ],
    (cards, moduleCards, moduleIds) => {
        const normalizedModuleIds = moduleIds.map(Number);

        const cardIds = moduleCards
            .filter(mc => normalizedModuleIds.includes(Number(mc.moduleId)))
            .map(mc => Number(mc.cardId));

        return cardIds
            .map(id => cards.find(card => card.id === id))
            .filter(Boolean);
    }
);