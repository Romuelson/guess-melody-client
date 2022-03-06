import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoute } from '../../const';
import { Questions } from '../../types/question';

import NotFound from '../pages/not-found';
import Welcome from '../pages/welcome';
import Login from '../pages/login';
import Lose from '../pages/lose';
import Result from '../pages/result';
import Game from '../../components/game/game';
import PrivateOutlet from '../../components/private-outlet/private-outlet';

type DefaultProps = {
	questions: Questions;
};

function Default({ questions }: DefaultProps) {
	return (
		<Routes>
			<Route path={AppRoute.Root} element={<Welcome />} />
			<Route path={AppRoute.Login} element={<Login />} />
			<Route path={AppRoute.Lose} element={<Lose />} />

			<Route path={AppRoute.Result} element={<PrivateOutlet />}>
				<Route path="" element={<Result />} />
			</Route>

			<Route
				path={AppRoute.Game}
				element={<Game questions={questions} />}
			/>

			<Route path={AppRoute.NotFound} element={<NotFound />} />
		</Routes>
	);
}

export default Default;
