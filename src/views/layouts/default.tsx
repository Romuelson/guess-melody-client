import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from '../common/header';
import Footer from '../common/footer';

import Home from '../pages/home';
import Catalog from '../pages/catalog';
import About from '../pages/about';

function Default() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/catalog" element={<Catalog />} />
				<Route path="/about" element={<About />} />
			</Routes>
			<Footer />
		</>
	);
}

export default Default;
