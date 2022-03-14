export const FIRST_GAME_STEP = 0;
export const MAX_MISTAKE_COUNT = 3;
export const ERROR_COUNT = 3;
export const STEP_COUNT = 1;

export enum AppRoute {
	Login = '/login',
	Lose = '/lose',
	Result = '/result',
	Root = '/',
	Game = '/game',
	NotFound = '*',
}

export enum AuthorizationStatus {
	Auth = 'AUTH',
	NoAuth = 'NO_AUTH',
	Unknown = 'UNKNOWN',
}

export enum GameType {
	Artist = 'artist',
	Genre = 'genre',
}

export enum APIRoute {
	Questions = '/questions',
	Login = '/login',
	Logout = '/logout',
}

export enum ReducerType {
	Process = 'game/process',
	Data = 'game/data',
	User = 'user/process',
}

export enum ActionType {
	incrementStep = 'incrementStep',
	checkUserAnswer = 'checkUserAnswer',
	resetGame = 'reset',
	loadQuestions = 'loadQuestions',
	requireAuthorization = 'requireAuthorization',
}
