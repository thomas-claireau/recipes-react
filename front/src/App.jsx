import React, { useState, useEffect } from 'react';
import './App.css';
import { apiFetch } from './utils';

import Login from './App/Login';
import Site from './App/Site';
import Loading from './App/Loading';

import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		apiFetch('/me').then(setUser).then(setLoading(false));
	}, []);

	return (
		<React.Fragment>
			<CssBaseline />
			{loading ? (
				<Loading />
			) : (
				<div className="App">{user ? <Site /> : <Login onConnect={setUser} />}</div>
			)}
		</React.Fragment>
	);
}

export default App;
