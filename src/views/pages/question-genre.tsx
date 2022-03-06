/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import GameHeader from '../common/game-header';

import {
	QuestionGenreType,
	UserGenreQuestionAnswer,
} from '../../types/question';

type QuestionGenreProps = {
	question: QuestionGenreType;
	onAnswer: (
		question: QuestionGenreType,
		answer: UserGenreQuestionAnswer
	) => void;
	renderPlayer: (src: string, playerIndex: number) => JSX.Element;
};

function QuestionGenre(props: QuestionGenreProps): JSX.Element {
	const { question, onAnswer, renderPlayer } = props;
	const { answers, genre } = question;

	const [userAnswers, setUserAnswers] = useState([
		false,
		false,
		false,
		false,
	]);

	return (
		<section className="game game--genre">
			<GameHeader />

			<section className="game__screen">
				<h2 className="game__title">Выберите {genre} треки</h2>
				<form
					className="game__tracks"
					onSubmit={(evt: FormEvent<HTMLFormElement>) => {
						evt.preventDefault();
						onAnswer(question, userAnswers);
					}}
				>
					{answers.map((answer, id) => {
						const keyValue = `${id}=${answer.src}`;
						return (
							<div key={keyValue} className="track">
								{renderPlayer(answer.src, id)}
								<div className="game__answer">
									<input
										className="game__input visually-hidden"
										type="checkbox"
										name="answer"
										value={`answer-${id}`}
										id={`answer-${id}`}
										checked={userAnswers[id]}
										onChange={({
											target,
										}: ChangeEvent<HTMLInputElement>) => {
											const value = target.checked;
											setUserAnswers([
												...userAnswers.slice(0, id),
												value,
												...userAnswers.slice(id + 1),
											]);
										}}
									/>
									<label
										className="game__check"
										htmlFor={`answer-${id}`}
									>
										Отметить
									</label>
								</div>
							</div>
						);
					})}

					<button className="game__submit button" type="submit">
						Ответить
					</button>
				</form>
			</section>
		</section>
	);
}

export default QuestionGenre;
