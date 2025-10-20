import {RootState} from "../../../app/store";
import {getItemById, getItems, getItemsByEntityIds} from "../../../shared";

export const selectModuleCardState = (state: RootState) => state.moduleCard.moduleCards;

export const selectAllModuleCards = getItems(selectModuleCardState);