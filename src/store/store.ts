import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';
import { createAPI } from '../services/api';

export const api = createAPI();

const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export default setupStore;
