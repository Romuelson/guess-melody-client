import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-route/history-route';
import Logo from './logo';

const history = createMemoryHistory();

describe('Component: Logo', () => {
	it('should render correctly', () => {
		render(
			<HistoryRouter history={history}>
				<Logo />
			</HistoryRouter>
		);

		expect(screen.getByAltText(/Угадай мелодию/i)).toBeInTheDocument();
		expect(screen.getByRole('link')).toBeInTheDocument();
	});

	it('should redirect to root url when user clicked to link', () => {
		history.push('/fake');

		render(
			<HistoryRouter history={history}>
				<Routes>
					<Route path="/" element={<h1>This is main page</h1>} />
					<Route path="*" element={<Logo />} />
				</Routes>
			</HistoryRouter>
		);

		expect(
			screen.queryByText(/This is main page/i)
		).not.toBeInTheDocument();

		userEvent.click(screen.getByRole('link'));

		expect(screen.getByText(/This is main page/i)).toBeInTheDocument();
	});
});
