/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Logo from '@images/melody-logo.png';

function Welcome() {
	return (
		<section className="welcome">
			<div className="welcome__logo">
				<img src={Logo} alt="Угадай мелодию" width="186" height="83" />
			</div>
			<button type="submit" className="welcome__button">
				<span className="visually-hidden">Начать игру</span>
			</button>
			<h2 className="welcome__rules-title">Правила игры</h2>
			<p className="welcome__text">Правила просты:</p>
			<ul className="welcome__rules-list">
				<li>Нужно ответить на все вопросы.</li>
				<li>Можно допустить 3 ошибки.</li>
			</ul>
			<p className="welcome__text">Удачи!</p>
		</section>
	);
}

export default Welcome;
