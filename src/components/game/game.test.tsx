import { render, screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-route/history-route';
import {
	makeFakeArtistQuestion,
	makeFakeGanreQuestion,
} from '../../mocks/game';
import { AppRoute } from '../../const';
import Game from './game';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const mockGenreQuestion = makeFakeGanreQuestion();
const mockArtist = makeFakeArtistQuestion();

describe('Component: GameScreen', () => {
	beforeAll(() => {
		window.HTMLMediaElement.prototype.play = () => Promise.resolve();
		window.HTMLMediaElement.prototype.pause = jest.fn();
	});

	it('should render GenreQuestionScreen', () => {
		const store = mockStore({
			GAME: { step: 0, mistakes: 2 },
			DATA: { questions: [mockGenreQuestion] },
		});

		const expectedGenre = mockGenreQuestion.genre;

		render(
			<Provider store={store}>
				<HistoryRouter history={history}>
					<Game />
				</HistoryRouter>
			</Provider>
		);

		expect(
			screen.getByText(new RegExp(`Выберите ${expectedGenre} треки`, 'i'))
		).toBeInTheDocument();
		expect(
			screen.queryByText(/Кто исполняет эту песню/i)
		).not.toBeInTheDocument();
	});

	it('should render ArtistQuestionScreen', () => {
		const store = mockStore({
			GAME: { step: 0, mistakes: 2 },
			DATA: { questions: [mockArtist] },
		});

		render(
			<Provider store={store}>
				<HistoryRouter history={history}>
					<Game />
				</HistoryRouter>
			</Provider>
		);

		expect(
			screen.getByText(/Кто исполняет эту песню/i)
		).toBeInTheDocument();
		expect(
			screen.queryByText(/Выберите rock треки/i)
		).not.toBeInTheDocument();
	});

	it('should redirect to "/" because unknown question type', () => {
		const store = mockStore({
			GAME: { step: 0, mistakes: 0 },
			DATA: { questions: [{}] },
		});

		history.push(AppRoute.Game);

		render(
			<Provider store={store}>
				<HistoryRouter history={history}>
					<Routes>
						<Route
							path={AppRoute.Root}
							element={<h1>Root screen</h1>}
						/>
						<Route path={AppRoute.Game} element={<Game />} />
					</Routes>
				</HistoryRouter>
			</Provider>
		);

		expect(screen.getByText(/Root screen/i)).toBeInTheDocument();
	});
});
