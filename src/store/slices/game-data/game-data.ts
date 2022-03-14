import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Questions } from '../../../types/question';
import { ActionType, ReducerType } from '../../../const';
import { GameData } from '../../../types/state';

const initialState: GameData = {
	questions: [],
	isDataLoaded: false,
};

const gameData = createSlice({
	name: ReducerType.Data,
	initialState,
	reducers: {
		[ActionType.loadQuestions]: (
			state,
			action: PayloadAction<Questions>
		) => {
			state.questions = action.payload;
		},
	},
});

export default gameData;
