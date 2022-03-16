import { useAppSelector } from '../../hooks/use-redux';
import { isCheckAuth } from '../../game';

import Default from '../../views/layouts/default';
import Loading from '../loading/loading';

function App(): JSX.Element {
	const { authorizationStatus } = useAppSelector(({ USER }) => USER);
	const { isDataLoaded } = useAppSelector(({ DATA }) => DATA);

	if (isCheckAuth(authorizationStatus) || !isDataLoaded) {
		return <Loading />;
	}

	return <Default authStatus={authorizationStatus} />;
}

export default App;
