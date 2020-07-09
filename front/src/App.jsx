import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchData } from './utils';

import Login from './App/Login';

import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
	const [user, setUser] = useState(null);

	console.log(process.env.API_URL);

	useEffect(function () {
		fetchData();
	}, []);

	return (
		<React.Fragment>
			<CssBaseline />
			<div className="App">{user ? 'connecté' : <Login />}</div>
		</React.Fragment>
	);
}

export default App;
