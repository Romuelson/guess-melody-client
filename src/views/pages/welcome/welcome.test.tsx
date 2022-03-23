import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import * as Redux from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../../components/history-route/history-route';
import Welcome from './welcome';
import { AppRoute } from '../../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const store = mockStore({});
const errorsCount = 3;

describe('Component: Welcome', () => {
	it('should render correctly', () => {
		render(
			<Provider store={store}>
				<HistoryRouter history={history}>
					<Routes>
						<Route
							path={AppRoute.Root}
							element={<Welcome errorsCount={errorsCount} />}
						/>
					</Routes>
				</HistoryRouter>
			</Provider>
		);

		expect(screen.getByText(/Правила игры/i)).toBeInTheDocument();
		expect(
			screen.getByText(/Нужно ответить на все вопросы/i)
		).toBeInTheDocument();
		expect(
			screen.getByText(`Можно допустить ${errorsCount} ошибки.`)
		).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByRole('button').textContent).toBe('Начать игру');
	});

	it('should redirect to /game when user clicked to start button', () => {
		const dispatch = jest.fn();

		const useDispatch = jest.spyOn(Redux, 'useDispatch');
		useDispatch.mockReturnValue(dispatch);

		render(
			<Provider store={store}>
				<HistoryRouter history={history}>
					<Routes>
						<Route
							path={AppRoute.Root}
							element={<Welcome errorsCount={errorsCount} />}
						/>
						<Route
							path={AppRoute.Game}
							element={<h1>This is Game</h1>}
						/>
					</Routes>
				</HistoryRouter>
			</Provider>
		);

		expect(screen.queryByText(/This is Game/i)).not.toBeInTheDocument();

		userEvent.click(screen.getByRole('button'));

		expect(screen.getByText(/This is Game/i)).toBeInTheDocument();
		expect(useDispatch).toBeCalledTimes(1);
	});
});
