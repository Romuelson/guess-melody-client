import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Welcome from '../pages/welcome';

function Default() {
	return (
		<Routes>
			<Route path="/" element={<Welcome />} />
		</Routes>
	);
}

export default Default;
