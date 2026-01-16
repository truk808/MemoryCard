import {RootState} from "../../../app/store";
import {getItemById, getItems} from "../../../shared/lib/selectors";

export const selectGroupState = (state: RootState) => state.group.groups;

export const selectAllGroups = getItems(selectGroupState);
export const selectGroupById = (id: number) => getItemById(selectGroupState, id);