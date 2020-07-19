import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Ingredient.scss';
import { apiFetch } from '../../utils';

export default function Ingredient({ ingredient, handleAction, handleError }) {
	const [action, setAction] = useState(null);
	const { id, title, unit } = ingredient;

	const handleSubmit = function (e) {
		e.preventDefault();
		handleAction({ type: action, id, data: new FormData(e.target) });
	};

	return (
		<form className="ingredient" onSubmit={handleSubmit}>
			<TextField
				id="title"
				name="title"
				label="Titre"
				placeholder={title}
				defaultValue={title}
			/>
			<TextField id="unit" name="unit" label="Unité" placeholder={unit} defaultValue={unit} />
			<div className="actions">
				<Button
					onClick={() => setAction('update')}
					type="submit"
					name="update"
					fullWidth
					variant="contained"
					color="primary"
				>
					Mettre à jour
				</Button>
				<Button
					onClick={() => setAction('remove')}
					type="submit"
					name="remove"
					fullWidth
					variant="contained"
					color="secondary"
				>
					Supprimer
				</Button>
			</div>
		</form>
	);
}

Ingredient.propTypes = {
	ingredient: PropTypes.object.isRequired,
	handleAction: PropTypes.func.isRequired,
};
