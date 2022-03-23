import { AppStore } from '../../store';
import { Questions } from '../../../types/question';
import { ReducerType } from '../../../const';

export const getQuestion = (state: AppStore): Questions =>
	state[ReducerType.Data]?.questions || [];

export const getLoadedDataStatus = (state: AppStore): boolean =>
	state[ReducerType.Data]?.isDataLoaded || false;
