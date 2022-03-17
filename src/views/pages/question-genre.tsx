import { PropsWithChildren } from 'react';

import {
	QuestionGenreType,
	UserGenreQuestionAnswer,
} from '../../types/question';

import Logo from '../../components/logo/logo';

import GenreQuestionList from '../../components/genre-question-list/genre-question-list';

type QuestionGenreProps = PropsWithChildren<{
	question: QuestionGenreType;
	onAnswer: (
		question: QuestionGenreType,
		answer: UserGenreQuestionAnswer
	) => void;
	renderPlayer: (src: string, playerIndex: number) => JSX.Element;
}>;

function QuestionGenre(props: QuestionGenreProps): JSX.Element {
	const { question, onAnswer, renderPlayer, children } = props;
	const { genre } = question;

	return (
		<section className="game game--genre">
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
				<h2 className="game__title">Выберите {genre} треки</h2>
				<GenreQuestionList
					question={question}
					onAnswer={onAnswer}
					renderPlayer={renderPlayer}
				/>
			</section>
		</section>
	);
}

export default QuestionGenre;
