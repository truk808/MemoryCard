import {RootState} from "../../../app/store";
import {getItemById, getItems, getItemsByEntityIds} from "../../../shared";

export const selectCardState = (state: RootState) => state.card.cards;

export const selectAllCards = getItems(selectCardState);
export const selectCardById = (id: number) => getItemById(selectCardState, id);
export const selectCardsByGroupId = (id: number[]) => getItemsByEntityIds(selectCardState, id);