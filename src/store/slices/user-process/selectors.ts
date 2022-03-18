import { AppStore } from '../../store';
import { AuthorizationStatus, ReducerType } from '../../../const';

export const getAuthorizationStatus = (state: AppStore): AuthorizationStatus =>
	state[ReducerType.User].authorizationStatus;
