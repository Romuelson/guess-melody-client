import React from 'react';

import { useAppSelector } from '../../hooks/use-redux';
import { isCheckAuth } from '../../game';

import Default from '../../views/layouts/default';
import Loading from '../loading/loading';

function App(): JSX.Element {
	const { authorizationStatus } = useAppSelector(
		(state) => state.userProcess
	);
	const { isDataLoaded } = useAppSelector((state) => state.gameData);

	if (isCheckAuth(authorizationStatus) || !isDataLoaded) {
		return <Loading />;
	}

	return <Default authStatus={authorizationStatus} />;
}

export default App;
