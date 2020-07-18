import React, { useState, useEffect } from 'react';
import Site from '../Site/Site';

import Link from '@material-ui/core/Link';

import { apiFetch } from '../../utils';

import './Recettes.scss';

export default function Recettes() {
	const [recipes, setRecipes] = useState(null);

	useEffect(() => {
		apiFetch('/recipes').then((recipes) => setRecipes(recipes));
	}, []);

	if (recipes === null) return null;

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
		</Site>
	);
}
