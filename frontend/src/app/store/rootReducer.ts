import { combineReducers } from '@reduxjs/toolkit';
import { groupReducer } from '../../entities/group/model/slice';
// import { userReducer } from '../../entities/user/model/slice';
// import { cardReducer } from '../../entities/card/model/slice';

export const rootReducer = combineReducers({
    group: groupReducer,
    // user: userReducer,
    // card: cardReducer,
});
