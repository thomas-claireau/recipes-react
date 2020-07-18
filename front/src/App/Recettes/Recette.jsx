import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';

import Site from '../Site/Site';
import Modal from '../Modal/Modal';
import EditRecipes from '../Forms/EditRecipe';

import { apiFetch, setDate } from '../../utils';

import './Recette.scss';

export default function Recette() {
	const params = useParams();
	const [recipe, setRecipe] = useState(null);

	useEffect(() => {
		apiFetch(`/recipes/${params['id']}`).then((recipe) => setRecipe(recipe));
	}, [params]);

	if (recipe === null) return null;

	const { title, short, content, ingredients } = recipe;
	let { created_at, updated_at } = recipe;

	created_at = setDate(new Date(created_at));
	updated_at = setDate(new Date(updated_at));

	return (
		<Site className="recipe">
			<div className="left">
				<div className="title">
					<h1>
						{title}
						<Modal labelButton={<SVG src={require('./edit.svg')} />}>
							<EditRecipes recipe={recipe} />
						</Modal>
					</h1>
					<div className="date">
						<span className="createdAt">{`Le ${created_at.date} à ${created_at.time}`}</span>
						<span className="updatedAt">{`Modifié le ${updated_at.date} à ${updated_at.time}`}</span>
					</div>
					<div className="short">{short}</div>
				</div>
				<div className="content">
					<SVG src={require('./recipe.svg')} />
					{content}
				</div>
			</div>
			<div className="right">
				<div className="ingredients">
					{ingredients.map((ingredient) => {
						const { id, title, unit, quantity } = ingredient;

						if ((id, title && unit && quantity)) {
							return (
								<div key={id} className="ingredient">
									<SVG src={require('./ingredient.svg')} />
									{`${title} - ${quantity}${unit}`}
								</div>
							);
						}

						return null;
					})}
				</div>
			</div>
		</Site>
	);
}
