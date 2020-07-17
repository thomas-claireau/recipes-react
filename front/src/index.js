import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './index.scss';
import App from './App';
import Recettes from './App/Recettes/Recettes';
import Recette from './App/Recettes/Recette';
import Ingredients from './App/Ingredients/Ingredients';
import Ingredient from './App/Ingredients/Ingredient';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<React.Fragment>
		<Router>
			<Switch>
				<Route exact path="/recettes/" component={Recettes} />
				<Route path={`/recettes/:id`} render={(props) => <Recette {...props} />} />
				<Route exact path="/" component={App} />
				<Route exact path="/ingredients/" component={Ingredients} />
				<Route path={`/ingredients/:id`} render={(props) => <Ingredient {...props} />} />
				<Route path="*">
					<Redirect to="/" />
				</Route>
			</Switch>
		</Router>
	</React.Fragment>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
