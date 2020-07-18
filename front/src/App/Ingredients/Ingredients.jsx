import React, { useState, useEffect, useReducer } from 'react';
import Site from '../Site/Site';
import Ingredient from './Ingredient';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import { apiFetch } from '../../utils';

function reducer(state, action) {
	switch (action.type) {
		case 'load':
			return action.payload;
		case 'add':
			return [...state, action.payload];
		case 'update':
			return null;
		case 'remove':
			return null;
		default:
			throw new Error(`L'action ${action.type} est inconnue`);
	}
}

export default function Ingredients() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [errorAdd, setErrorAdd] = useState(null);

	const [ingredients, dispatch] = useReducer(reducer, null);

	useEffect(() => {
		apiFetch('/ingredients').then((ingredients) =>
			dispatch({ type: 'load', payload: ingredients })
		);
	}, []);

	if (ingredients === null) return 'chargement';

	const handleError = function (error) {
		if (error) setError(error);
	};

	const handleSubmit = function (e) {
		e.preventDefault();

		setLoading(true);
		setErrorAdd(null);

		const data = new FormData(e.target);

		apiFetch('/ingredients', {
			method: 'POST',
			body: data,
		})
			.then((ingredient) => dispatch({ type: 'add', payload: ingredient }))
			.catch((error) => {
				setErrorAdd(error.errors[0].message);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleAction = function ({ type, id }) {
		console.log(type);
		console.log(id);
	};

	return (
		<Site className="ingredients">
			{error && <Alert severity="error">{error}</Alert>}
			{ingredients.map((ingredient) => {
				return (
					<Ingredient
						key={ingredient.id}
						ingredient={ingredient}
						handleAction={handleAction}
						handleError={handleError}
					/>
				);
			})}
			{errorAdd && <Alert severity="error">{errorAdd}</Alert>}
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
		</Site>
	);
}
