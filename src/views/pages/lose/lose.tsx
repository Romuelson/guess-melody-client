/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import melodyLogo from '@images/melody-logo.png';

import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';

import { useAppDispatch } from '../../../hooks/use-redux';
import { reset } from '../../../store/slices/game-process/game-process';

function Lose() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	return (
		<section className="result">
			<div className="result__logo">
				<img
					src={melodyLogo}
					alt="Угадай мелодию"
					width="186"
					height="83"
				/>
			</div>
			<h2 className="result__title">Какая жалость!</h2>
			<p className="result__total result__total--fail">
				У вас закончились все попытки. Ничего, повезёт в следующий раз!
			</p>
			<button
				onClick={() => {
					dispatch(reset());
					navigate(AppRoute.Game);
				}}
				className="replay"
				type="button"
			>
				Попробовать ещё раз
			</button>
		</section>
	);
}

export default Lose;
