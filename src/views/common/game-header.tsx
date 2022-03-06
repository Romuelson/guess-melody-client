/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Logo from '../../components/logo/logo';

function GameHeader() {
	return (
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
			<div className="game__mistakes">
				<div className="wrong" />
				<div className="wrong" />
				<div className="wrong" />
			</div>
		</header>
	);
}

export default GameHeader;
