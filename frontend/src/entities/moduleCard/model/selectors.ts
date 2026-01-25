import {RootState} from "../../../app/store";
import {getItems} from "../../../shared/lib/selectors";

export const selectModuleCardState = (state: RootState) => state.moduleCard.moduleCards;

export const selectAllModuleCards = getItems(selectModuleCardState);
// export const selectModuleCardById = (id: number) => getItemById(selectCardTagState, id);
// export const selectModulesByGroupId = (id: number[]) => getItemsByEntityIds(selectCardTagState, id);