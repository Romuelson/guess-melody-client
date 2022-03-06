import React from 'react';

import Default from '../../views/layouts/default';

import questions from '../../mocks/questions';

function App(): JSX.Element {
	return <Default questions={questions} />;
}

export default App;
