import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Select from './MultipleSelect';

import './EditRecipe.scss';
import { apiFetch } from '../../utils';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
			width: '100%',
		},
	},
	submit: {
		marginTop: theme.spacing(3),
	},
}));

export default function EditRecipes({ recipe }) {
	const { id, title, short, content } = recipe;
	const [loading, setLoading] = useState(false);

	const classes = useStyles();

	const handleSubmit = function (e) {
		setLoading(true);
		e.preventDefault();

		const data = new FormData(e.target);

		apiFetch(`/recipes/${id}`, {
			method: 'PUT',
			body: data,
		}).finally(setLoading(false));
	};

	return (
		<div className={`edit-recipes`} noValidate autoComplete="off">
			<h2>
				Editer la recette
				<span>{title}</span>
			</h2>
			<form className={classes.root} onSubmit={handleSubmit}>
				<TextField
					id="title"
					name="title"
					label="Titre"
					placeholder={title}
					defaultValue={title}
				/>
				<TextField
					id="short"
					name="short"
					label="Courte description"
					placeholder={short}
					defaultValue={short}
				/>
				<TextField
					id="content"
					name="content"
					label="Contenu de la recette"
					placeholder="Rentrez ici le contenu de la recette"
					defaultValue={content}
					multiline={true}
				/>
				<Select
					name="ingredients"
					list={apiFetch('/ingredients')}
					data={recipe.ingredients.map((item) => item.title)}
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					disabled={loading}
				>
					Editer la recette
				</Button>
			</form>
		</div>
	);
}

EditRecipes.propTypes = {
	recipe: PropTypes.object.isRequired,
};
