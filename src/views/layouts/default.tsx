import { Route, Routes } from 'react-router-dom';

import { AppRoute, AuthorizationStatus, MAX_MISTAKE_COUNT } from '../../const';

import NotFound from '../pages/not-found';
import Welcome from '../pages/welcome';
import Login from '../pages/login';
import Lose from '../pages/lose';
import Result from '../pages/result';
import Game from '../../components/game/game';
import PrivateRoute from '../../components/private-route/private-route';

type DefaultProps = {
	authStatus: AuthorizationStatus;
};

function Default({ authStatus }: DefaultProps) {
	return (
		<Routes>
			<Route
				path={AppRoute.Root}
				element={<Welcome errorsCount={MAX_MISTAKE_COUNT} />}
			/>
			<Route path={AppRoute.Login} element={<Login />} />
			<Route path={AppRoute.Lose} element={<Lose />} />

			<Route
				path={AppRoute.Result}
				element={
					<PrivateRoute authorizationStatus={authStatus}>
						<Result />
					</PrivateRoute>
				}
			/>

			<Route path={AppRoute.Game} element={<Game />} />

			<Route path={AppRoute.NotFound} element={<NotFound />} />
		</Routes>
	);
}

export default Default;
