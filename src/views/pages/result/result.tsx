/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */

import melodyLogo from '@images/melody-logo.png';

import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks/use-redux';
import { logoutAction } from '../../../services/api-actions';
import { reset } from '../../../store/slices/game-process/game-process';

import {
	getMistakesCount,
	getStep,
} from '../../../store/slices/game-process/selectors';

function Result() {
	const step = useAppSelector(getStep);
	const mistakes = useAppSelector(getMistakesCount);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const correctlyQuestionsCount = step - mistakes;

	return (
		<section className="result">
			<div className="result-logout__wrapper">
				<Link
					className="result-logout__link"
					onClick={(evt) => {
						evt.preventDefault();
						dispatch(logoutAction);
					}}
					to="/"
				>
					Выход
				</Link>
			</div>
			<div className="result__logo">
				<img
					src={melodyLogo}
					alt="Угадай мелодию"
					width="186"
					height="83"
				/>
			</div>
			<h2 className="result__title">Вы настоящий меломан!</h2>
			<p className="result__total">
				Вы ответили правильно на {correctlyQuestionsCount} вопросов и
				совершили {mistakes} ошибки
			</p>
			<button
				onClick={() => {
					dispatch(reset());
					navigate(AppRoute.Game);
				}}
				className="replay"
				type="button"
			>
				Сыграть ещё раз
			</button>
		</section>
	);
}

export default Result;
