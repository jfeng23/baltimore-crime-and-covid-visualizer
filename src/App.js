import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages';
import Maps from './pages/maps';
//import Blogs from './pages/blogs';
//import SignUp from './pages/signup';
//import Contact from './pages/contact';

function App() {
return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/' element={<Home />} />
		<Route path='/maps' element={<Maps />} />
	</Routes>
	</Router>
);
}

export default App;

