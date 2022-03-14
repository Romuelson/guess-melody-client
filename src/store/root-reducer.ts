import { combineReducers } from '@reduxjs/toolkit';

import gameProcess from './slices/game-process/game-process';
import gameData from './slices/game-data/game-data';
import userProcess from './slices/user-process/user-process';
import error from './slices/error/error';

const rootReducer = combineReducers({
	gameProcess,
	gameData,
	userProcess,
	error,
});

export default rootReducer;
