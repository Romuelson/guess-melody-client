/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/await-thenable */

import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';

import { AppStore } from '../store/store';
import { createAPI } from './api';
import { APIRoute } from '../const';

import {
	checkAuthAction,
	fetchQuestionAction,
	loginAction,
	logoutAction,
} from './api-actions';

import { requireAuthorization } from '../store/slices/user-process/user-process';
import { AuthData } from '../types/auth-data';
import { loadQuestions } from '../store/slices/game-data/game-data';

import { makeFakeArtistQuestion, makeFakeGanreQuestion } from '../mocks/game';

describe('Async actions', () => {
	const api = createAPI();
	const mockAPI = new MockAdapter(api);
	const middlewares = [thunk.withExtraArgument(api)];

	const mockStore = configureMockStore<
		AppStore,
		Action,
		ThunkDispatch<AppStore, typeof api, Action>
	>(middlewares);

	it('should authorization status is «auth» when server return 200', async () => {
		const store = mockStore();
		mockAPI.onGet(APIRoute.Login).reply(200, []);

		expect(store.getActions()).toEqual([]);

		await store.dispatch(checkAuthAction());

		const actions = store.getActions().map(({ type }) => type);

		expect(actions).toContain(requireAuthorization.toString());
	});

	it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
		const fakeUser: AuthData = {
			login: 'test@test.ru',
			password: '123456',
		};

		mockAPI.onPost(APIRoute.Login).reply(200, { token: 'secret' });

		const store = mockStore();
		Storage.prototype.setItem = jest.fn();

		await store.dispatch(loginAction(fakeUser));

		const actions = store.getActions().map(({ type }) => type);

		expect(actions).toContain(requireAuthorization.toString());

		expect(Storage.prototype.setItem).toBeCalledTimes(1);
		expect(Storage.prototype.setItem).toBeCalledWith(
			'guess-melody-token',
			'secret'
		);
	});

	it('should dispatch Load_Questions when GET /questions', async () => {
		const mockQuestions = [
			makeFakeArtistQuestion(),
			makeFakeGanreQuestion(),
		];
		mockAPI.onGet(APIRoute.Questions).reply(200, mockQuestions);

		const store = mockStore();

		await store.dispatch(fetchQuestionAction());

		const actions = store.getActions().map(({ type }) => type);

		expect(actions).toContain(loadQuestions.toString());
	});

	it('should dispatch Logout when Delete /logout', async () => {
		mockAPI.onDelete(APIRoute.Logout).reply(204);

		const store = mockStore();
		Storage.prototype.removeItem = jest.fn();

		await store.dispatch(logoutAction());

		const actions = store.getActions().map(({ type }) => type);

		expect(actions).toContain(requireAuthorization.toString());

		expect(Storage.prototype.removeItem).toBeCalledTimes(1);
		expect(Storage.prototype.removeItem).toBeCalledWith(
			'guess-melody-token'
		);
	});
});
