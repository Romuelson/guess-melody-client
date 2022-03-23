import { BrowserHistory } from 'history';
import { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

export interface HistoryRouterProps {
	history: BrowserHistory;
	basename?: string;
	children?: React.ReactNode;
}

function HistoryRouter(props: HistoryRouterProps) {
	const { history, basename, children } = props;

	const [state, setState] = useState({
		action: history.action,
		location: history.location,
	});

	useLayoutEffect(() => history.listen(setState), [history]);

	return (
		<Router
			basename={basename}
			location={state.location}
			navigationType={state.action}
			navigator={history}
		>
			{children}
		</Router>
	);
}

export default HistoryRouter;
