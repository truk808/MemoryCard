import {createSlice} from "@reduxjs/toolkit";
import {ModuleCard} from "../../../shared";

interface ModuleCardState {
    moduleCards:ModuleCard[];
}

const initialState: ModuleCardState = {
    moduleCards: [],
}

const moduleCardSlice = createSlice({
    name: "moduleCard",
    initialState,
    reducers: {
        setModuleCards: (state, action) => {
          state.moduleCards = action.payload;
        },
        addModuleCard: (state, action) => {
            state.moduleCards.push(action.payload);
        },
        removeModuleCard(state, action) {
            state.moduleCards = state.moduleCards.filter((groupModule) => groupModule.id === action.payload.id);
        },
        removeAllByModuleId(state, action) {
            state.moduleCards = state.moduleCards.filter((groupModule) => groupModule.moduleId === action.payload.moduleId);
        }
    }
})

export const {removeAllByModuleId, removeModuleCard, addModuleCard, setModuleCards} = moduleCardSlice.actions;
export const moduleCardReducer = moduleCardSlice.reducer