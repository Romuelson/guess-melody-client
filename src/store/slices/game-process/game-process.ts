import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	FIRST_GAME_STEP,
	STEP_COUNT,
	ReducerType,
	ActionType,
} from '../../../const';

import { Question, UserAnswer } from '../../../types/question';

import { isAnswerCorrect } from '../../../game';

const initialState = {
	mistakes: 0,
	step: FIRST_GAME_STEP,
};

const gameProcess = createSlice({
	name: ReducerType.Process,
	initialState,
	reducers: {
		[ActionType.incrementStep]: (state) => {
			state.step += STEP_COUNT;
		},
		[ActionType.checkUserAnswer]: (
			state,
			action: PayloadAction<{
				question: Question;
				userAnswer: UserAnswer;
			}>
		) => {
			const { question, userAnswer } = action.payload;

			state.mistakes += Number(!isAnswerCorrect(question, userAnswer));
		},
		[ActionType.resetGame]: (state) => {
			state.mistakes = initialState.mistakes;
			state.step = initialState.step;
		},
	},
});

export const { incrementStep, reset, checkUserAnswer } = gameProcess.actions;
export default gameProcess.reducer;
