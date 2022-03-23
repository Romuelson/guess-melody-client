import { AuthorizationStatus, GameType } from './const';
import {
	Question,
	UserAnswer,
	QuestionArtistType,
	UserArtistQuestionAnswer,
	QuestionGenreType,
	UserGenreQuestionAnswer,
} from './types/question';

export const isArtistAnswerCorrect = (
	question: QuestionArtistType,
	userAnswer: UserArtistQuestionAnswer
): boolean => userAnswer === question.song.artist;

export const isGenreAnswerCorrect = (
	question: QuestionGenreType,
	userAnswer: UserGenreQuestionAnswer
): boolean =>
	userAnswer.every(
		(answer, index) =>
			answer === (question.answers[index].genre === question.genre)
	);

export const isAnswerCorrect = (
	question: Question,
	answer: UserAnswer
): boolean => {
	if (question.type === GameType.Artist && typeof answer === 'string') {
		return isArtistAnswerCorrect(question, answer);
	}

	if (question.type === GameType.Genre && Array.isArray(answer)) {
		return isGenreAnswerCorrect(question, answer);
	}

	return false;
};

export const isCheckAuth = (
	authorizationStatus: AuthorizationStatus
): boolean => authorizationStatus === AuthorizationStatus.Unknown;
