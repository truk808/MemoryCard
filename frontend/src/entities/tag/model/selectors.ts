import {RootState} from "../../../app/store";
import {getItemById, getItems, getItemsByEntityIds} from "../../../shared";

export const selectTagState = (state: RootState) => state.tag.tags;

export const selectAllTags = getItems(selectTagState);
export const selectTagById = (id: number) => getItemById(selectTagState, id);
export const selectTagsByCardId = (id: number[]) => getItemsByEntityIds(selectTagState, id);