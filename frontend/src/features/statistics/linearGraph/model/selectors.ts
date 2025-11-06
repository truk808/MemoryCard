import {RootState} from "../../../../app/store";
import {getItems} from "../../../../shared";

export const selectLinearGraphState = (state: RootState) => state.linearGraph.progress;

export const selectLinearGraph = getItems(selectLinearGraphState);