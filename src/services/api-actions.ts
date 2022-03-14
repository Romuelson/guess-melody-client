import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	APIRoute,
	ReducerType,
	AsyncActionType,
	AuthorizationStatus,
} from '../const';
import { Questions } from '../types/question';
import { loadQuestions } from '../store/slices/game-data/game-data';

import setupStore, { api } from '../store/store';
import { requireAuthorization } from '../store/slices/user-process/user-process';

import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from './token';

const store = setupStore();

export const fetchQuestionAction = createAsyncThunk(
	`${ReducerType.Data}${AsyncActionType.FetchQuestions}`,
	async () => {
		const { data } = await api.get<Questions>(APIRoute.Questions);

		store.dispatch(loadQuestions(data));
	}
);

export const checkAuthAction = createAsyncThunk(
	`${ReducerType.User}${AsyncActionType.CheckAuth}`,
	async () => {
		await api.get(APIRoute.Login);

		store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
	}
);

export const loginAction = createAsyncThunk(
	`${ReducerType.User}${AsyncActionType.Login}`,
	async ({ login: email, password }: AuthData) => {
		const {
			data: { token },
		} = await api.post<UserData>(APIRoute.Login, { email, password });

		saveToken(token);
		store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
	}
);

export const logoutAction = createAsyncThunk(
	`${ReducerType.User}${AsyncActionType.Logout}`,
	async () => {
		await api.delete(APIRoute.Logout);

		dropToken();

		store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
	}
);
