import { $authHost } from "./axios";
import {Group} from "../../entities/group";
import {Module} from "../../entities/module";
import {Card} from "../../entities/card";
import {Tag} from "../../entities/tag";
import {GroupModule} from "../../entities/groupModule";
import {ModuleCard} from "../../entities/moduleCard";
import {CardTag} from "../../entities/cardTag";

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
