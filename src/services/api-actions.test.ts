/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/await-thenable */

import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createBrowserHistory } from 'history';

import { AppStore } from '../store/store';
import { createAPI } from './api';
import { APIRoute } from '../const';
import { checkAuthAction } from './api-actions';
import { requireAuthorization } from '../store/slices/user-process/user-process';

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
});
