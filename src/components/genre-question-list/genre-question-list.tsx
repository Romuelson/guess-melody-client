import { FormEvent } from 'react';

import { useUserAnswers } from '../../hooks/use-user-answers';

import {
	QuestionGenreType,
	UserGenreQuestionAnswer,
} from '../../types/question';

import GenreQuestionItem from '../genre-question-item/genre-question-item';

type GenreQuestionListProps = {
	question: QuestionGenreType;
	onAnswer: (
		question: QuestionGenreType,
		answers: UserGenreQuestionAnswer
	) => void;
	renderPlayer: (src: string, playerIndex: number) => JSX.Element;
};

function GenreQuestionList(props: GenreQuestionListProps) {
	const { onAnswer, question, renderPlayer } = props;
	const { answers } = question;

	const [userAnswers, handleAnswerChenge] = useUserAnswers(question);

	return (
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
					<GenreQuestionItem
						answer={answer}
						id={id}
						key={keyValue}
						onChange={handleAnswerChenge}
						renderPlayer={renderPlayer}
						userAnswer={userAnswers[id]}
					/>
				);
			})}

			<button className="game__submit button" type="submit">
				Ответить
			</button>
		</form>
	);
}

export default GenreQuestionList;
