import rootReducer from '../store/root-reducer';
import setupStore from '../store/store';

import { Questions } from './question';
import { AuthorizationStatus } from '../const';

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export type GameData = {
	questions: Questions;
	isDataLoaded: boolean;
};

export type GameProcess = {
	mistakes: number;
	step: number;
};

export type UserProcess = {
	authorizationStatus: AuthorizationStatus;
};
