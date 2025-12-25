import { $authHost } from "./axios";
import {Card, CardTag, Group, GroupModule, Module, ModuleCard, Tag} from "../types";

export interface BootstrapResponse {
    groups: Group[];
    modules: Module[];
    cards: Card[];
    tags: Tag[];
    groupModules: GroupModule[];
    moduleCards: ModuleCard[];
    cardTags: CardTag[];
}

export const bootstrapUserData = async (): Promise<BootstrapResponse> => {
    const { data } = await $authHost.get('/api/bootstrap');
    return data;
};
