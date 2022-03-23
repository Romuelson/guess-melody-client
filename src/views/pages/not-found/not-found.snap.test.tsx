import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import NotFound from './not-found';

describe('Component: NotFoundScreen', () => {
	it('should render correctly', () => {
		const { container } = render(
			<MemoryRouter>
				<NotFound />
			</MemoryRouter>
		);

		expect(container).toMatchSnapshot();
	});
});
