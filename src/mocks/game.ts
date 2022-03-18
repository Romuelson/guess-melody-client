/* eslint-disable import/no-extraneous-dependencies */

import { internet, name, system } from 'faker';
import { GameType } from '../const';
import { QuestionArtistType } from '../types/question';

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
