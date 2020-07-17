import React, { useState, useEffect } from 'react';
import './App.scss';
import { apiFetch } from './utils';

import Login from './App/Login/Login';
import Site from './App/Site/Site';

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		apiFetch('/me')
			.then(setUser)
			.catch(() => setUser(false));
	}, []);

	if (user === null) return null;

	return (
		<React.Fragment>
			<div className="App">{user ? <Site>accueil</Site> : <Login onConnect={setUser} />}</div>
		</React.Fragment>
	);
}

export default App;
