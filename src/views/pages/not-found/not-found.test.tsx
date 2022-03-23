import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NotFound from './not-found';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

describe('Component: NotFoundScreen', () => {
	it('should render correctly', () => {
		render(
			<MemoryRouter>
				<NotFound />
			</MemoryRouter>
		);

		const headerElement = screen.getByText('404. Page not found');
		const linkElement = screen.getByText('Вернуться на главную');

		expect(headerElement).toBeInTheDocument();
		expect(linkElement).toBeInTheDocument();
	});
});
