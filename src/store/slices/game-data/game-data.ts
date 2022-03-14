import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActionType, ReducerType } from '../../../const';
import { GameData } from '../../../types/state';
import { questions as questionItem } from '../../../mocks/questions';
import { Questions } from '../../../types/question';

const initialState: GameData = {
	questions: questionItem,
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
