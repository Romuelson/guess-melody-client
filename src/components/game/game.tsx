/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { AppRoute, GameType, FIRST_GAME_STEP } from '../../const';

import {
	QuestionArtistType,
	QuestionGenreType,
	Questions,
} from '../../types/question';

import withAudioPlayer from '../../hocs/with-audio-player/with-audio-player';
import QuestionArtist from '../../views/pages/question-artist';
import QuestionGenre from '../../views/pages/question-genre';

const ArtistQuestionScreenWrapped = withAudioPlayer(QuestionArtist);
const GenreQuestionScreenWrapped = withAudioPlayer(QuestionGenre);

type GameProps = {
	questions: Questions;
};

function Game({ questions }: GameProps): JSX.Element {
	const [step, setStep] = useState(FIRST_GAME_STEP);

	const question = questions[step];

	if (step >= questions.length || !question) {
		return <Navigate to={AppRoute.Root} />;
	}

	switch (question.type) {
		case GameType.Artist:
			return (
				<ArtistQuestionScreenWrapped
					key={step}
					question={question as QuestionArtistType}
					onAnswer={() => setStep((prevStep) => prevStep + 1)}
				/>
			);
		case GameType.Genre:
			return (
				<GenreQuestionScreenWrapped
					key={step}
					question={question as QuestionGenreType}
					onAnswer={() => setStep((prevStep) => prevStep + 1)}
				/>
			);
		default:
			return <Navigate to={AppRoute.Root} />;
	}
}

export default Game;
