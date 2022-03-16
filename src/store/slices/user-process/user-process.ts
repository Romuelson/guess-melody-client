import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionType, AuthorizationStatus, ReducerType } from '../../../const';

export type UserProcess = {
	authorizationStatus: AuthorizationStatus;
};

const initialState: UserProcess = {
	authorizationStatus: AuthorizationStatus.Unknown,
};

export const userProcess = createSlice({
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

export const { requireAuthorization } = userProcess.actions;
