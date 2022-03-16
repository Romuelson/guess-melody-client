/* eslint-disable import/no-cycle */

import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	APIRoute,
	ReducerType,
	AsyncActionType,
	AuthorizationStatus,
	TIMEOUT_SHOW_ERROR,
	AppRoute,
} from '../const';
import { Questions } from '../types/question';
import { loadQuestions } from '../store/slices/game-data/game-data';

import { store, api } from '../store/store';
import { requireAuthorization } from '../store/slices/user-process/user-process';

import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from './token';
import { setError } from '../store/slices/error/error';
import { errorHandle } from './error-handle';
import { redirectToRoute } from '../store/action';

export const clearErrorAction = createAsyncThunk(
	`${ReducerType.Error}${AsyncActionType.ClearError}`,
	() => {
		setTimeout(() => store.dispatch(setError('')), TIMEOUT_SHOW_ERROR);
	}
);

export const fetchQuestionAction = createAsyncThunk(
	`${ReducerType.Data}${AsyncActionType.FetchQuestions}`,
	async () => {
		try {
			const { data } = await api.get<Questions>(APIRoute.Questions);

			store.dispatch(loadQuestions(data));
		} catch (error) {
			errorHandle(error);
		}
	}
);

export const checkAuthAction = createAsyncThunk(
	`${ReducerType.User}${AsyncActionType.CheckAuth}`,
	async () => {
		try {
			await api.get(APIRoute.Login);

			store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
		} catch (error) {
			errorHandle(error);
			store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
		}
	}
);

export const loginAction = createAsyncThunk(
	`${ReducerType.User}${AsyncActionType.Login}`,
	async ({ login: email, password }: AuthData) => {
		try {
			const {
				data: { token },
			} = await api.post<UserData>(APIRoute.Login, { email, password });

			saveToken(token);
			store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
			store.dispatch(redirectToRoute(AppRoute.Result));
		} catch (error) {
			errorHandle(error);
			store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
		}
	}
);

export const logoutAction = createAsyncThunk(
	`${ReducerType.User}${AsyncActionType.Logout}`,
	async () => {
		try {
			await api.delete(APIRoute.Logout);

			dropToken();

			store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
		} catch (error) {
			errorHandle(error);
		}
	}
);
