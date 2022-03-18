import { ReducerType } from '../../../const';
import { AppStore } from '../../store';

export const getStep = (state: AppStore): number =>
	state[ReducerType.Process].step;
export const getMistakesCount = (state: AppStore): number =>
	state[ReducerType.Process].mistakes;
