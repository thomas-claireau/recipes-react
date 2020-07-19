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

export default function AddRecipe() {
	const [loading, setLoading] = useState(false);

	const classes = useStyles();

	const handleSubmit = function (e) {};

	return (
		<div className="edit-recipes" noValidate autoComplete="off">
			<h2>Ajouter une recette</h2>
			<form className={classes.root} onSubmit={handleSubmit}>
				<TextField id="title" name="title" label="Titre" placeholder="Rentrez un titre" />
				<TextField
					id="short"
					name="short"
					label="Courte description"
					placeholder="Rentrez une courte description"
				/>
				<TextField
					id="content"
					name="content"
					label="Contenu de la recette"
					placeholder="Rentrez ici le contenu de la recette"
					multiline={true}
				/>
				<Select name="ingredients" list={apiFetch('/ingredients')} data={[]} />
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					disabled={loading}
				>
					Ajouter la recette
				</Button>
			</form>
		</div>
	);
}
