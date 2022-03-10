import { combineReducers } from '@reduxjs/toolkit';
import gameProcess from './slices/game-process/game-process';

const rootReducer = combineReducers({
	gameProcess,
});

export default rootReducer;
