import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionType, AuthorizationStatus, ReducerType } from '../../../const';

const initialState = {
	authorizationStatus: AuthorizationStatus.Unknown,
};

const userProcess = createSlice({
	name: ReducerType.User,
	initialState,
	reducers: {
		[ActionType.requireAuthorization]: (
			state,
			action: PayloadAction<AuthorizationStatus>
		) => {
			state.authorizationStatus = action.payload;
		},
	},
});

export default userProcess;
