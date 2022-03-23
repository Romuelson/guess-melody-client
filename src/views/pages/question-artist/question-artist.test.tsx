import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../../components/history-route/history-route';
import QuestionArtist from './question-artist';
import { makeFakeArtistQuestion } from '../../../mocks/game';

const mockArtist = makeFakeArtistQuestion();
const history = createMemoryHistory();

describe('Component: QuestionArtist', () => {
	it('should render correctly', () => {
		render(
			<HistoryRouter history={history}>
				<QuestionArtist
					question={mockArtist}
					onAnswer={jest.fn()}
					renderPlayer={jest.fn(() => (
						<h1>Fake player</h1>
					))}
				>
					<span>Something component</span>
				</QuestionArtist>
			</HistoryRouter>
		);

		expect(
			screen.getByText(/Кто исполняет эту песню/i)
		).toBeInTheDocument();
		expect(screen.getByText(/Fake player/i)).toBeInTheDocument();
		expect(screen.getByText(/Something component/i)).toBeInTheDocument();
	});

	it('onAnswer should called when user choose answer', () => {
		const onAnswer = jest.fn();

		render(
			<HistoryRouter history={history}>
				<QuestionArtist
					question={mockArtist}
					onAnswer={onAnswer}
					renderPlayer={jest.fn(() => (
						<h1>Fake player</h1>
					))}
				>
					<span>Something component</span>
				</QuestionArtist>
			</HistoryRouter>
		);

		const [firstAnswerData, secondAnswerData, thirdAnswerData] =
			mockArtist.answers;
		const [firstAnswer, secondAnswer, thirdAnswer] =
			screen.queryAllByRole('radio');

		userEvent.click(firstAnswer);
		userEvent.click(secondAnswer);
		userEvent.click(thirdAnswer);

		expect(onAnswer).toBeCalledTimes(3);
		expect(onAnswer).nthCalledWith(1, mockArtist, firstAnswerData.artist);
		expect(onAnswer).nthCalledWith(2, mockArtist, secondAnswerData.artist);
		expect(onAnswer).nthCalledWith(3, mockArtist, thirdAnswerData.artist);
	});
});
