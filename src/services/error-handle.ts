import request from 'axios';
import { setError } from '../store/slices/error/error';

import setupStore from '../store/store';

import { clearErrorAction } from './api-actions';
import { ErrorType } from '../types/error';
import { HttpCode } from '../const';

const store = setupStore();

// eslint-disable-next-line import/prefer-default-export
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
		// eslint-disable-next-line default-case
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
