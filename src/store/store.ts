/* eslint-disable @typescript-eslint/no-shadow */
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { createAPI } from '../services/api';

export const api = createAPI();

const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: api,
				},
			}),
	});
};

export default setupStore;
