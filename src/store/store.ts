import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './root-reducer';

const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	});
};

export default setupStore;
