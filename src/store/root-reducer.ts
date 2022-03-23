/* eslint-disable import/prefer-default-export */
import { combineReducers } from '@reduxjs/toolkit';

import { ReducerType } from '../const';

import { gameData } from './slices/game-data/game-data';
import { gameProcess } from './slices/game-process/game-process';
import { userProcess } from './slices/user-process/user-process';
import { error } from './slices/error/error';

export const rootReducer = combineReducers({
	[ReducerType.Data]: gameData.reducer,
	[ReducerType.Process]: gameProcess.reducer,
	[ReducerType.User]: userProcess.reducer,
	[ReducerType.Error]: error.reducer,
});
