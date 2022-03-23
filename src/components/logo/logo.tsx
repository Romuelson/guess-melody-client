/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Link } from 'react-router-dom';

import melodyLogoGinger from '@images/melody-logo-ginger.png';

function Logo(): JSX.Element {
	return (
		<Link className="game__back" to="/">
			<span className="visually-hidden">Сыграть ещё раз</span>
			<img
				src={melodyLogoGinger}
				className="game__logo"
				alt="Угадай мелодию"
			/>
		</Link>
	);
}

export default Logo;
