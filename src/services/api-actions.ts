/* eslint-disable import/no-cycle */

import { AxiosInstance } from 'axios';

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

import { store, AppDispatch, AppStore } from '../store/store';
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

export const fetchQuestionAction = createAsyncThunk<
	void,
	undefined,
	{
		dispatch: AppDispatch;
		state: AppStore;
		extra: AxiosInstance;
	}
>(
	`${ReducerType.Data}${AsyncActionType.FetchQuestions}`,
	async (_arg, { dispatch, extra: api }) => {
		try {
			const { data } = await api.get<Questions>(APIRoute.Questions);

			dispatch(loadQuestions(data));
		} catch (error) {
			errorHandle(error);
		}
	}
);

export const checkAuthAction = createAsyncThunk<
	void,
	undefined,
	{
		dispatch: AppDispatch;
		state: AppStore;
		extra: AxiosInstance;
	}
>(
	`${ReducerType.User}${AsyncActionType.CheckAuth}`,
	async (_arg, { dispatch, extra: api }) => {
		try {
			await api.get(APIRoute.Login);

			dispatch(requireAuthorization(AuthorizationStatus.Auth));
		} catch (error) {
			errorHandle(error);
			dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
		}
	}
);

export const loginAction = createAsyncThunk<
	void,
	AuthData,
	{
		dispatch: AppDispatch;
		state: AppStore;
		extra: AxiosInstance;
	}
>(
	`${ReducerType.User}${AsyncActionType.Login}`,
	async ({ login: email, password }, { dispatch, extra: api }) => {
		try {
			const {
				data: { token },
			} = await api.post<UserData>(APIRoute.Login, { email, password });

			saveToken(token);
			dispatch(requireAuthorization(AuthorizationStatus.Auth));
			dispatch(redirectToRoute(AppRoute.Result));
		} catch (error) {
			errorHandle(error);
			dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
		}
	}
);

export const logoutAction = createAsyncThunk<
	void,
	undefined,
	{
		dispatch: AppDispatch;
		state: AppStore;
		extra: AxiosInstance;
	}
>(
	`${ReducerType.User}${AsyncActionType.Logout}`,
	async (_arg, { dispatch, extra: api }) => {
		try {
			await api.delete(APIRoute.Logout);

			dropToken();

			dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
		} catch (error) {
			errorHandle(error);
		}
	}
);
