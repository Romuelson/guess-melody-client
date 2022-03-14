/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute, GameType, MAX_MISTAKE_COUNT } from '../../const';

import {
	Question,
	QuestionArtistType,
	QuestionGenreType,
	Questions,
	UserAnswer,
} from '../../types/question';

import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';
import QuestionArtist from '../../views/pages/question-artist';
import QuestionGenre from '../../views/pages/question-genre';
import Mistakes from '../mistakes/mistakes';

import { useAppDispatch, useAppSelector } from '../../hooks/use-redux';

import {
	incrementStep,
	reset,
	checkUserAnswer,
} from '../../store/slices/game-process/game-process';

const ArtistQuestionScreenWrapped = withAudioPlayer(QuestionArtist);
const GenreQuestionScreenWrapped = withAudioPlayer(QuestionGenre);

function Game(): JSX.Element {
	const { mistakes, step, questions } = useAppSelector(
		(state) => state.gameProcess
	);

	const dispatch = useAppDispatch();

	const question = questions[step];

	if (mistakes >= MAX_MISTAKE_COUNT) {
		return <Navigate to={AppRoute.Lose} />;
	}

	if (step >= questions.length || !question) {
		return <Navigate to={AppRoute.Result} />;
	}

	const onUserAnswer = (questionItem: Question, userAnswer: UserAnswer) => {
		dispatch(incrementStep());
		dispatch(checkUserAnswer({ question: questionItem, userAnswer }));
	};

	switch (question.type) {
		case GameType.Artist:
			return (
				<ArtistQuestionScreenWrapped
					key={step}
					question={question}
					onAnswer={onUserAnswer}
				>
					<Mistakes count={mistakes} />
				</ArtistQuestionScreenWrapped>
			);
		case GameType.Genre:
			return (
				<GenreQuestionScreenWrapped
					key={step}
					question={question}
					onAnswer={onUserAnswer}
				>
					<Mistakes count={mistakes} />
				</GenreQuestionScreenWrapped>
			);
		default:
			return <Navigate to={AppRoute.Root} />;
	}
}

export default Game;
