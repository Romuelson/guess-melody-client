import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import withAudioPlayer from './with-audio-player';
import QuestionArtist from '../../views/pages/question-artist/question-artist';
import { makeFakeArtistQuestion } from '../../mocks/game';

jest.mock('../../components/audio-player/audio-player', () => {
	const mockAudioPlayer = () => <>This is mock AudioPlayer</>;

	return {
		__esModule: true,
		default: mockAudioPlayer,
	};
});

describe('HOC: withAudioPlayer', () => {
	it('base component should correct rendering when use with HOC', () => {
		const BaseComponentWrapped = withAudioPlayer(() => (
			<h1>withAudioPlayer</h1>
		));

		render(<BaseComponentWrapped />);

		expect(screen.getByText(/withAudioPlayer/i)).toBeInTheDocument();
	});

	it('base component should correct rendering another component with render-prop', () => {
		const mockQuestion = makeFakeArtistQuestion();
		const history = createMemoryHistory();

		const BaseComponentWrapped = withAudioPlayer(QuestionArtist);

		render(
			<HistoryRouter history={history}>
				<BaseComponentWrapped
					onAnswer={jest.fn()}
					question={mockQuestion}
				>
					<p>This is children component</p>
				</BaseComponentWrapped>
			</HistoryRouter>
		);

		expect(
			screen.getByText(/This is children component/i)
		).toBeInTheDocument();
		expect(
			screen.getByText(/This is mock AudioPlayer/i)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Кто исполняет эту песню/i)
		).toBeInTheDocument();
	});
});
