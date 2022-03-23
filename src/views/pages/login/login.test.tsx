import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// import HistoryRouter from '../history-route/history-route';
import Login from './login';

const mockStore = configureMockStore();

describe('Component: Login', () => {
	it('should render "Login" when user navigate to "login" url', () => {
		render(
			<Provider store={mockStore({})}>
				<MemoryRouter initialEntries={['/login']}>
					<Login />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText(/Сыграть ещё раз/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Логин/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/Пароль/i)).toBeInTheDocument();

		userEvent.type(screen.getByTestId('login'), 'keks');
		userEvent.type(screen.getByTestId('password'), '123456');

		expect(screen.getByDisplayValue(/keks/i)).toBeInTheDocument();
		expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
	});
});
