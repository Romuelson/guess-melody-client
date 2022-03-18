import { gameData, loadQuestions } from './game-data';
import {
	makeFakeArtistQuestion,
	makeFakeGanreQuestion,
} from '../../../mocks/game';

const questions = [makeFakeArtistQuestion(), makeFakeGanreQuestion()];

describe('Reducer: gameData', () => {
	it('without additional parameters should return initial state', () => {
		expect(gameData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
			{ questions: [], isDataLoaded: false }
		);
	});

	it('should update questions by load questions', () => {
		const state = { questions: [], isDataLoaded: false };

		expect(gameData.reducer(state, loadQuestions(questions))).toEqual({
			questions: [],
			isDataLoaded: true,
		});
	});
});
