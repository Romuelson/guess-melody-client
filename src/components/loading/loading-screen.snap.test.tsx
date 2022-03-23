import { render } from '@testing-library/react';
import LoadingScreen from './loading';

describe('Component: LoadingScreen', () => {
	test('should render correctly', () => {
		const { container } = render(<LoadingScreen />);

		expect(container).toMatchSnapshot();
	});
});
