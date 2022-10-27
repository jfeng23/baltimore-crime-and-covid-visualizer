import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages';
import Maps from './pages/maps';
import Charts from './pages/charts'
import Footer from './components/Footer';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/' element={<Home />} />
		<Route path='/maps' element={<Maps />} />
		<Route path='/charts' element={<Charts />} />
	</Routes>
	<Footer></Footer>
	</Router>
);
}

export default App;

