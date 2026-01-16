import {RootState} from "../../../app/store";
import {getItemById, getItems, getItemsByEntityIds} from "../../../shared/lib/selectors";

export const selectCardState = (state: RootState) => state.card.cards;

export const selectAllCards = getItems(selectCardState);
export const selectCardById = (id: number) => getItemById(selectCardState, id);
export const selectCardsByTagId = (id: number[]) => getItemsByEntityIds(selectCardState, id);