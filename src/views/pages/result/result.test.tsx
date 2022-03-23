import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../components/history-route/history-route';
import Result from './result';
import { AppRoute } from '../../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.Result);

const store = mockStore({
	GAME: { step: 10, mistakes: 2 },
});

describe('Component: WinScreen', () => {
	it('should render correctly', () => {
		render(
			<Provider store={store}>
				<HistoryRouter history={history}>
					<Result />
				</HistoryRouter>
			</Provider>
		);

		expect(screen.getByText(/Вы настоящий меломан!/i)).toBeInTheDocument();
	});

	it('should redirect when user click "Replay Button"', () => {
		render(
			<Provider store={store}>
				<HistoryRouter history={history}>
					<Routes>
						<Route path={AppRoute.Result} element={<Result />} />
						<Route
							path={AppRoute.Game}
							element={<h1>Game Screen</h1>}
						/>
					</Routes>
				</HistoryRouter>
			</Provider>
		);

		userEvent.click(screen.getByText(/Сыграть ещё раз/i));

		expect(screen.getByText('Game Screen')).toBeInTheDocument();
	});
});
