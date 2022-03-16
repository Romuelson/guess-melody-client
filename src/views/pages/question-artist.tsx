/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/control-has-associated-label */

import { ChangeEvent, PropsWithChildren } from 'react';

import {
	QuestionArtistType,
	UserArtistQuestionAnswer,
} from '../../types/question';
import Logo from '../../components/logo/logo';

type QuestionArtistProps = PropsWithChildren<{
	question: QuestionArtistType;
	onAnswer: (
		question: QuestionArtistType,
		answer: UserArtistQuestionAnswer
	) => void;
	renderPlayer: (src: string, playerIndex: number) => JSX.Element;
}>;

function QuestionArtist(props: QuestionArtistProps) {
	const { question, onAnswer, renderPlayer, children } = props;
	const { answers, song } = question;

	return (
		<section className="game game--artist">
			<header className="game__header">
				<Logo />
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="timer"
					viewBox="0 0 780 780"
				>
					<circle
						className="timer__line"
						cx="390"
						cy="390"
						r="370"
						style={{
							filter: 'url(#blur)',
							transform: 'rotate(-90deg) scaleY(-1)',
							transformOrigin: 'center',
						}}
					/>
				</svg>
				{children}
			</header>

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
