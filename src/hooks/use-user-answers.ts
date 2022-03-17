import { useState } from 'react';
import { QuestionGenreType } from '../types/question';

type ResultUserAnswers = [boolean[], (id: number, value: boolean) => void];

export const useUserAnswers = (
	question: QuestionGenreType
): ResultUserAnswers => {
	const answersCount = question.answers.length;

	const [answers, setAnswers] = useState<boolean[]>(
		Array.from({ length: answersCount }, () => false)
	);

	const handleAnswerChenge = (id: number, value: boolean) => {
		const userAnswers = answers.slice(0);
		userAnswers[id] = value;
		setAnswers(userAnswers);
	};

	return [answers, handleAnswerChenge];
};
