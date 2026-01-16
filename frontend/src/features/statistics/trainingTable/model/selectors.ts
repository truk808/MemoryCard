import {RootState} from "../../../../app/store";
import {getItems} from "../../../../shared/lib/selectors";

export const selectTrainingTableState = (state: RootState) => state.trainingTable.sessions;

export const selectTrainingTable = getItems(selectTrainingTableState);