import {
	checkUserAnswer,
	gameProcess,
	incrementStep,
	reset,
} from './game-process';

import {
	makeFakeArtistQuestion,
	makeFakeGanreQuestion,
} from '../../../mocks/game';

const mockArtistQuestion = makeFakeArtistQuestion();
const mockGenreQuestion = makeFakeGanreQuestion();

describe('Reducer: gameProcess', () => {
	it('without additional parameters should return initial state', () => {
		expect(
			gameProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })
		).toEqual({ step: 0, mistakes: 0 });
	});

	it('should increment current step by a given value', () => {
		const state = { step: 0, mistakes: 0 };

		expect(gameProcess.reducer(state, incrementStep())).toEqual({
			step: 1,
			mistakes: 0,
		});
	});

	it('should increase number of mistakes with the wrong answer', () => {
		const state = { step: 0, mistakes: 0 };

		const wrongArtistQuestionAnswer = 'unknown';
		const wrongGenreQuestionAnswer = mockGenreQuestion.answers.map(
			(answer) => answer.genre !== mockGenreQuestion.genre
		);

		expect(
			gameProcess.reducer(
				state,
				checkUserAnswer({
					question: mockArtistQuestion,
					userAnswer: wrongArtistQuestionAnswer,
				})
			)
		).toEqual({ step: 0, mistakes: 1 });

		expect(
			gameProcess.reducer(
				state,
				checkUserAnswer({
					question: mockGenreQuestion,
					userAnswer: wrongGenreQuestionAnswer,
				})
			)
		).toEqual({ step: 0, mistakes: 1 });
	});

	it('should not increase mistakes with the correct answer', () => {
		const state = { step: 0, mistakes: 0 };

		const { artist: correctlyArtistQuestionAnswer } =
			mockArtistQuestion.song;

		const correctlyGenreQuestionAnswer = mockGenreQuestion.answers.map(
			(answer) => answer.genre === mockGenreQuestion.genre
		);

		expect(
			gameProcess.reducer(
				state,
				checkUserAnswer({
					question: mockArtistQuestion,
					userAnswer: correctlyArtistQuestionAnswer,
				})
			)
		).toEqual({ step: 0, mistakes: 0 });

		expect(
			gameProcess.reducer(
				state,
				checkUserAnswer({
					question: mockGenreQuestion,
					userAnswer: correctlyGenreQuestionAnswer,
				})
			)
		).toEqual({ step: 0, mistakes: 0 });
	});

	it('should have reset game', () => {
		expect(gameProcess.reducer({ step: 5, mistakes: 1 }, reset())).toEqual({
			step: 0,
			mistakes: 0,
		});

		expect(gameProcess.reducer({ step: 0, mistakes: 0 }, reset())).toEqual({
			step: 0,
			mistakes: 0,
		});

		expect(gameProcess.reducer({ step: 2, mistakes: 0 }, reset())).toEqual({
			step: 0,
			mistakes: 0,
		});
	});
});
