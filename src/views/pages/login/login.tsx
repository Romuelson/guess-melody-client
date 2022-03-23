/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// import melodyLogo from '@images/melody-logo.png';

import { useAppDispatch } from '../../../hooks/use-redux';
import { AppRoute } from '../../../const';
import { AuthData } from '../../../types/auth-data';
import { loginAction } from '../../../services/api-actions';

function Login() {
	const loginRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onSubmit = (authData: AuthData) => {
		dispatch(loginAction(authData));
	};

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();

		if (loginRef.current !== null && passwordRef.current !== null) {
			onSubmit({
				login: loginRef.current.value,
				password: passwordRef.current.value,
			});
		}
	};

	return (
		<section className="login">
			<div className="login__logo">
				<img
					src="images/melody-logo.png"
					alt="Угадай мелодию"
					width="186"
					height="83"
				/>
			</div>
			<h2 className="login__title">Вы настоящий меломан!</h2>
			<p className="login__text">
				Хотите узнать свой результат? Представтесь!
			</p>
			<form className="login__form" action="" onSubmit={handleSubmit}>
				<p className="login__field">
					<label className="login__label" htmlFor="name">
						Логин
					</label>
					<input
						ref={loginRef}
						className="login__input"
						type="text"
						name="name"
						id="name"
						data-testid="login"
					/>
				</p>
				<p className="login__field">
					<label className="login__label" htmlFor="password">
						Пароль
					</label>
					<input
						ref={passwordRef}
						className="login__input"
						type="text"
						name="password"
						id="password"
						data-testid="password"
					/>
					<span className="login__error">Неверный пароль</span>
				</p>
				<button className="login__button button" type="submit">
					Войти
				</button>
			</form>
			<button
				onClick={() => navigate(AppRoute.Game)}
				className="replay"
				type="button"
			>
				Сыграть ещё раз
			</button>
		</section>
	);
}

export default Login;
