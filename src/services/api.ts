import axios from 'axios';

const BACKEND_URL = 'https://9.react.pages.academy/guess-melody';
const REQUEST_TIMEOUT = 5000;

const createAPI = () => {
	const api = axios.create({
		baseURL: BACKEND_URL,
		timeout: REQUEST_TIMEOUT,
	});

	return api;
};

export default createAPI;
