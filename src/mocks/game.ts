/* eslint-disable import/no-extraneous-dependencies */

import { internet, music, name, system } from 'faker';
import { GameType } from '../const';
import { QuestionArtistType, QuestionGenreType } from '../types/question';

export const makeFakeArtistQuestion = (): QuestionArtistType =>
	({
		type: GameType.Artist,
		song: {
			artist: name.title(),
			src: system.filePath(),
		},
		answers: new Array(3)
			.fill(null)
			.map(() => ({ picture: internet.avatar(), artist: name.title() })),
	} as QuestionArtistType);

export const makeFakeGanreQuestion = (): QuestionGenreType =>
	({
		type: GameType.Genre,
		genre: music.genre(),
		answers: new Array(4)
			.fill(null)
			.map(() => ({ src: system.filePath(), genre: music.genre() })),
	} as QuestionGenreType);
