import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Questions } from '../../../types/question';
import { ActionType, ReducerType } from '../../../const';

type GameData = {
	questions: Questions;
	isDataLoaded: boolean;
};

const initialState: GameData = {
	questions: [],
	isDataLoaded: false,
};

export const gameData = createSlice({
	name: ReducerType.Data,
	initialState,
	reducers: {
		[ActionType.loadQuestions]: (
			state,
			action: PayloadAction<Questions>
		) => {
			state.questions = action.payload;
			state.isDataLoaded = true;
		},
	},
});

export const { loadQuestions } = gameData.actions;
