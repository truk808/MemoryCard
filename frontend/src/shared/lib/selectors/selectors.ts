import {RootState} from "../../../app/store";

export const getItems =
    <T>(selector: (state: RootState) => T[]) =>
    (state: RootState): T[] => selector(state);

export const getItemById =
    <T extends {id: number}>(selector: (state: RootState) => T[], id: number) =>
    (state: RootState): T[] => selector(state).filter(item => item.id === id);

export const getItemsByEntityIds =
    <T extends { id: number }>(selector: (state: RootState) => T[], ids: number[]) =>
    (state: RootState): T[] => selector(state).filter(item => ids.includes(item.id));