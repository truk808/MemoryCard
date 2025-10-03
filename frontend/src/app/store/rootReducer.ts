import { combineReducers } from '@reduxjs/toolkit';
import { groupReducer } from '../../entities/group/model/slice';
// import { userReducer } from '../../entities/user/model/slice';
// import { cardReducer } from '../../entities/termCard/model/slice';

export const rootReducer = combineReducers({
    group: groupReducer,
    // user: userReducer,
    // termCard: cardReducer,
});
