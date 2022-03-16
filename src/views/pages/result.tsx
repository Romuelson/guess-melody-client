/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */

import melodyLogo from '@images/melody-logo.png';

function Result() {
	return (
		<section className="result">
			<div className="result-logout__wrapper">
				<a className="result-logout__link" href="#">
					Выход
				</a>
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
				Вы ответили правильно на 6 вопросов и совершили 2 ошибки
			</p>
			<button className="replay" type="button">
				Сыграть ещё раз
			</button>
		</section>
	);
}

export default Result;
