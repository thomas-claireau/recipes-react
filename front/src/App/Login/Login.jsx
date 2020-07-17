import React, { useState } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { apiFetch } from '../../utils';

import './Login.scss';

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Login({ onConnect }) {
	const classes = useStyles();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async function (e) {
		setError(null);
		setLoading(true);
		e.preventDefault();

		const data = new FormData(e.target);

		apiFetch('/login', {
			method: 'POST',
			body: data,
		})
			.then((data) => {
				onConnect(data);
			})
			.catch(({ errors }) => {
				setError(errors[0].message);
				setLoading(false);
			});
	};

	return (
		<Container className="login" component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate onSubmit={handleSubmit}>
					{error && <Alert severity="error">{error}</Alert>}
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Pseudo"
						type="text"
						name="email"
						autoComplete="text"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={loading}
					>
						Sign In
					</Button>
				</form>
			</div>
		</Container>
	);
}
