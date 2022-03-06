/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent } from 'react';
import GameHeader from '../common/game-header';

import {
	QuestionArtistType,
	UserArtistQuestionAnswer,
} from '../../types/question';

type QuestionArtistProps = {
	question: QuestionArtistType;
	onAnswer: (
		question: QuestionArtistType,
		answer: UserArtistQuestionAnswer
	) => void;
	renderPlayer: (src: string, playerIndex: number) => JSX.Element;
};

function QuestionArtist(props: QuestionArtistProps) {
	const { question, onAnswer, renderPlayer } = props;
	const { answers, song } = question;

	return (
		<section className="game game--artist">
			<GameHeader />

			<section className="game__screen">
				<h2 className="game__title">Кто исполняет эту песню?</h2>
				<div className="game__track">
					<div className="track">{renderPlayer(song.src, 0)}</div>
				</div>

				<form className="game__artist">
					{answers.map((answer, id) => (
						<div key={answer.artist} className="artist">
							<input
								className="artist__input visually-hidden"
								type="radio"
								name="answer"
								value={`artist-${id}`}
								id={`answer-${id}`}
								onChange={(
									evt: ChangeEvent<HTMLInputElement>
								) => {
									evt.preventDefault();
									onAnswer(question, answer.artist);
								}}
							/>
							<label
								className="artist__name"
								htmlFor={`answer-${id}`}
							>
								<img
									className="artist__picture"
									src={answer.picture}
									alt={answer.artist}
								/>
							</label>
						</div>
					))}
				</form>
			</section>
		</section>
	);
}

export default QuestionArtist;
