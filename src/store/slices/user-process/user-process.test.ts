import { requireAuthorization, userProcess } from './user-process';
import { AuthorizationStatus } from '../../../const';

describe('Reducer: user', () => {
	it('without additional parameters should return initial state', () => {
		expect(
			userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })
		).toEqual({ autorizationStatus: AuthorizationStatus.Unknown });
	});

	it('should update authorizationStatus to "AUTH"', () => {
		const state = { authorizationStatus: AuthorizationStatus.NoAuth };

		expect(
			userProcess.reducer(
				state,
				requireAuthorization(AuthorizationStatus.Auth)
			)
		).toEqual({ autorizationStatus: AuthorizationStatus.Auth });
	});

	it('should update authorizationStatus to "NO_AUTH"', () => {
		const state = { authorizationStatus: AuthorizationStatus.NoAuth };

		expect(
			userProcess.reducer(
				state,
				requireAuthorization(AuthorizationStatus.NoAuth)
			)
		).toEqual({ authorizationStatus: AuthorizationStatus.NoAuth });
	});
});
