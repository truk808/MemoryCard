import {RootState} from "../../../app/store";
import {getItemById, getItems, getItemsByEntityIds} from "../../../shared/lib/selectors";

export const selectModuleState = (state: RootState) => state.module.modules;

export const selectAllModules = getItems(selectModuleState);
export const selectModuleById = (id: number) => getItemById(selectModuleState, id);
export const selectModulesByGroupId = (id: number[]) => getItemsByEntityIds(selectModuleState, id);