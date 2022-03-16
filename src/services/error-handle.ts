/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable import/no-cycle */

import request from 'axios';
import { setError } from '../store/slices/error/error';

import { store } from '../store/store';

import { clearErrorAction } from './api-actions';
import { ErrorType } from '../types/error';
import { HttpCode } from '../const';

export const errorHandle = (error: ErrorType): void => {
	if (!request.isAxiosError(error)) {
		throw error;
	}

	const handleError = (message: string) => {
		store.dispatch(setError(message));
		store.dispatch(clearErrorAction());
	};

	const { response } = error;

	if (response) {
		switch (response.status) {
			case HttpCode.BAD_REQUEST:
				handleError(response.data.error);
				break;
			case HttpCode.UNAUTHORIZED:
				handleError(response.data.error);
				break;
			case HttpCode.NOT_FOUND:
				handleError(response.data.error);
				break;
		}
	}
};
