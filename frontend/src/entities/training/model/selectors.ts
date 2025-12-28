import { createSelector } from "@reduxjs/toolkit";
import {RootState} from "../../../app/store";

export const selectCardsByModuleIds = (moduleIds: number[]) =>
    createSelector(
        [
            (state: RootState) => state.card.cards,
            (state: RootState) => state.moduleCard.moduleCards,
        ],
        (cards, moduleCards) => {
            const normalizedModuleIds = moduleIds.map(Number);

            const cardIds = moduleCards
                .filter(mc => normalizedModuleIds.includes(Number(mc.moduleId)))
                .map(mc => Number(mc.cardId));

            const cardsForModules = cardIds
                .map(id => cards.find(card => card.id === id))
                .filter(Boolean);

            return cardsForModules;
        }
    );
