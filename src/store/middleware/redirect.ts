/* eslint-disable @typescript-eslint/no-unused-vars */

import { Middleware } from '@reduxjs/toolkit';
import { AsyncActionType, ReducerType } from '../../const';
import browserHistory from '../../utils/browser-history';
import { redirectToRoute } from '../action';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;
type Redirect = ReturnType<typeof redirectToRoute>;

export const redirect: Middleware<unknown, Reducer> =
	(_store) => (next) => (action: Redirect) => {
		if (
			action.type ===
			`${ReducerType.Process}${AsyncActionType.RedirectToRoute}`
		) {
			browserHistory.push(action.payload);
		}

		return next(action);
	};
