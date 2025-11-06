import {RootState} from "../../../app/store";
import {getItemById, getItems, getItemsByEntityIds} from "../../../shared";

export const selectCardTagState = (state: RootState) => state.cardTag.cardTags;

export const selectAllCardTags = getItems(selectCardTagState);
// export const selectModuleById = (id: number) => getItemById(selectCardTagState, id);
// export const selectModulesByGroupId = (id: number[]) => getItemsByEntityIds(selectCardTagState, id);