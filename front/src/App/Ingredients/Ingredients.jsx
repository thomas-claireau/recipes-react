import React, { useState, useEffect, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import Site from '../Site/Site';
import Ingredient from './Ingredient';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import { apiFetch } from '../../utils';

import { add, update, remove } from './store';

const ACTIONS = {
	add,
	update,
	remove,
};

function reducer(state, action) {
	switch (action.type) {
		case 'load':
			return action.payload;
		case 'add':
			return [...state, action.payload];
		case 'update':
			return state.map((item) => {
				if (item == action.payload) return action.payload;

				return item;
			});
		case 'remove':
			return state.filter((item) => item.id !== action.payload);
		default:
			throw new Error(`L'action ${action.type} est inconnue`);
	}
}

export default function Ingredients() {
	const [loading, setLoading] = useState(false);
	const [login, setLogin] = useState(true);
	const [error, setError] = useState(null);

	const [ingredients, dispatch] = useReducer(reducer, null);

	useEffect(() => {
		apiFetch('/ingredients')
			.then((ingredients) => dispatch({ type: 'load', payload: ingredients }))
			.catch((e) => {
				if (e.errors.code == 401) setLogin(false);

				console.error(e.errors.message);
			});
	}, []);

	if (login) {
		if (ingredients === null) return null;
	} else {
		return <Redirect to="/" />;
	}

	const handleAction = function (action) {
		setError(null);
		ACTIONS[action.type](action, dispatch, setError);
	};

	const handleSubmit = function (e) {
		e.preventDefault();
		const form = e.target;
		handleAction({ type: 'add', data: new FormData(form) });
		form.reset();
	};

	return (
		<Site className="ingredients">
			{error && error.type !== 'add' && <Alert severity="error">{error.message}</Alert>}
			{ingredients.map((ingredient) => {
				return (
					<Ingredient
						key={ingredient.id}
						ingredient={ingredient}
						handleAction={handleAction}
					/>
				);
			})}
			{error && error.type === 'add' && <Alert severity="error">{error.message}</Alert>}
			<form className="ingredient" onSubmit={handleSubmit}>
				<TextField
					id="title"
					name="title"
					label="Titre"
					placeholder="Nom de l'ingrédient"
				/>
				<TextField id="unit" name="unit" label="Unité" placeholder="Unité" />
				<div className="actions">
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						disabled={loading}
					>
						Ajouter
					</Button>
				</div>
			</form>
			{error && error.type !== 'add' && <Alert severity="error">{error.message}</Alert>}
		</Site>
	);
}
