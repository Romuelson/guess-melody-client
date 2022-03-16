/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useNavigate } from 'react-router-dom';

import Logo from '@images/melody-logo.png';

import { AppRoute } from '../../const';

import { useAppDispatch } from '../../hooks/use-redux';
import { reset } from '../../store/slices/game-process/game-process';

type WelcomeProps = {
	errorsCount: number;
};

function Welcome({ errorsCount }: WelcomeProps) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	return (
		<section className="welcome">
			<div className="welcome__logo">
				<img src={Logo} alt="Угадай мелодию" width="186" height="83" />
			</div>
			<button
				type="submit"
				className="welcome__button"
				onClick={() => {
					dispatch(reset);
					navigate(AppRoute.Game);
				}}
			>
				<span className="visually-hidden">Начать игру</span>
			</button>
			<h2 className="welcome__rules-title">Правила игры</h2>
			<p className="welcome__text">Правила просты:</p>
			<ul className="welcome__rules-list">
				<li>Нужно ответить на все вопросы.</li>
				<li>Можно допустить {errorsCount} ошибки.</li>
			</ul>
			<p className="welcome__text">Удачи!</p>
		</section>
	);
}

export default Welcome;
