/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import melodyLogo from '@images/melody-logo.png';

function Lose() {
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
			<button className="replay" type="button">
				Попробовать ещё раз
			</button>
		</section>
	);
}

export default Lose;
