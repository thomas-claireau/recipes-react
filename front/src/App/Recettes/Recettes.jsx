import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SVG from 'react-inlinesvg';

import Site from '../Site/Site';

import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Modal from '../Modal/Modal';
import AddRecipe from '../Forms/AddRecipe';

import { apiFetch } from '../../utils';

import './Recettes.scss';

export default function Recettes() {
	const [recipes, setRecipes] = useState(null);
	const [login, setLogin] = useState(true);

	useEffect(() => {
		apiFetch('/recipes')
			.then((recipes) => setRecipes(recipes))
			.catch((e) => {
				if (e.errors.code == 401) setLogin(false);

				console.error(e.errors.message);
			});
	}, []);

	if (login) {
		if (recipes === null) return null;
	} else {
		return <Redirect to="/" />;
	}

	return (
		<Site className="recipes">
			<ul>
				{recipes.map((recipe) => {
					return (
						<li key={recipe.id}>
							<Link href={recipe.id}>
								<div className="title">{recipe.title}</div>
								<div className="description">{recipe.short}</div>
							</Link>
						</li>
					);
				})}
			</ul>
			<Modal labelButton={<SVG src={require('./add.svg')} />}>
				<AddRecipe />
			</Modal>
		</Site>
	);
}
