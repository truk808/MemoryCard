import { configureStore } from '@reduxjs/toolkit';
import {groupReducer} from "../../entities/group/model/slice";
import {groupModuleReducer} from "../../entities/groupModule/model/slice";
import {moduleReducer} from "../../entities/module/model/slice";
import {moduleCardReducer} from "../../entities/moduleCard/model/slice";
import {cardReducer} from "../../entities/card/model/slice";
import {userReducer} from "../../entities/user/model/slise";
import {tagReducer} from "../../entities/tag/model/slice";
import {cardTagReducer} from "../../entities/cardTag/model/slice";
import {publicationReducer} from "../../entities/publication/model/slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        group: groupReducer,
        groupModule: groupModuleReducer,
        module: moduleReducer,
        moduleCard: moduleCardReducer,
        card: cardReducer,
        cardTag: cardTagReducer,
        tag: tagReducer,
        publication: publicationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
