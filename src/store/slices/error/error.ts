import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionType, ReducerType } from '../../../const';

type InitialState = {
	error: string;
};

const initialState: InitialState = {
	error: '',
};

const error = createSlice({
	name: ReducerType.Error,
	initialState,
	reducers: {
		[ActionType.setError]: (state, action: PayloadAction<string>) => {
			state.error = action.payload;
		},
	},
});

export const { setError } = error.actions;
export default error.reducer;
