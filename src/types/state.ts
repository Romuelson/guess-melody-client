import rootReducer from '../store/root-reducer';
import setupStore from '../store/store';

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
