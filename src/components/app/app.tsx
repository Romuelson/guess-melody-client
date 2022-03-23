import { useAppSelector } from '../../hooks/use-redux';
import { isCheckAuth } from '../../game';

import Default from '../../views/layouts/default';
import Loading from '../loading/loading';

import { getAuthorizationStatus } from '../../store/slices/user-process/selectors';
import { getLoadedDataStatus } from '../../store/slices/game-data/selectors';

function App(): JSX.Element {
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const isDataLoaded = useAppSelector(getLoadedDataStatus);

	if (isCheckAuth(authorizationStatus) || !isDataLoaded) {
		return <Loading />;
	}

	return <Default authStatus={authorizationStatus} />;
}

export default App;
