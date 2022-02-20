import { configureStore, combineReducers } from '@reduxjs/toolkit';
import couterReducer from './counter/counter-slice';

const rootReducer = combineReducers({
	couterReducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
