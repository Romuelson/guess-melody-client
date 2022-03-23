import { FIRST_GAME_STEP, ReducerType } from '../../../const';
import { AppStore } from '../../store';

const initialValue = FIRST_GAME_STEP;

export const getStep = (state: AppStore): number =>
	state[ReducerType.Process]?.step || 0;

export const getMistakesCount = (state: AppStore): number =>
	state[ReducerType.Process]?.mistakes || initialValue;
