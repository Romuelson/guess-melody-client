/* eslint-disable @typescript-eslint/no-floating-promises */
import '../public/styles/index.scss';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import setupStore from './store/store';

import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction, fetchQuestionAction } from './services/api-actions';

const root = document.getElementById('root');
const store = setupStore();

store.dispatch(fetchQuestionAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ErrorMessage />
				<App />
			</BrowserRouter>
		</Provider>
	</StrictMode>,
	root
);
