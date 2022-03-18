import { AnyAction } from '@reduxjs/toolkit';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { AppStore } from '../store';
import { redirect } from './redirect';
import { AppRoute } from '../../const';
import { redirectToRoute } from '../action';

const fakeHistory = {
	location: { pathname: '' },
	push(path: string) {
		this.location.pathname = path;
	},
};

jest.mock('../../utils/browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<AppStore, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
	beforeEach(() => {
		fakeHistory.push('');
	});

	it('should be redirect to /login', () => {
		store.dispatch(redirectToRoute(AppRoute.Login));

		expect(fakeHistory.location.pathname).toBe(AppRoute.Login);

		expect(store.getActions()).toEqual([redirectToRoute(AppRoute.Login)]);
	});

	it('should not to be redirect /lose because bad action', () => {
		store.dispatch({ type: 'UNKNOWN_ACTION', payload: AppRoute.Lose });

		expect(fakeHistory.location.pathname).not.toBe(AppRoute.Lose);
	});
});
