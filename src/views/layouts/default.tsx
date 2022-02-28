import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoute } from '../../const';

import NotFound from '../pages/not-found';
import Welcome from '../pages/welcome';
import Login from '../pages/login';
import Lose from '../pages/lose';

function Default() {
	return (
		<Routes>
			<Route path={AppRoute.Root} element={<Welcome />} />
			<Route path={AppRoute.Login} element={<Login />} />
			<Route path={AppRoute.Lose} element={<Lose />} />
			<Route path={AppRoute.NotFound} element={<NotFound />} />
		</Routes>
	);
}

export default Default;
