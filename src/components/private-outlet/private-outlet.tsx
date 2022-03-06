import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AppRoute } from '../../const';
import useAuth from '../../hooks/use-auth';

function PrivateOutlet() {
	const isAuth = useAuth();
	return isAuth ? <Outlet /> : <Navigate to={AppRoute.Login} />;
}

export default PrivateOutlet;
