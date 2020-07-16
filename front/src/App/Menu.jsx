import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	'@global': {
		ul: {
			margin: 0,
			padding: 0,
			listStyle: 'none',
		},
	},
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	toolbar: {
		flexWrap: 'wrap',
	},
	toolbarTitle: {
		flexGrow: 1,
		textAlign: 'left',
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	heroContent: {
		padding: theme.spacing(8, 0, 6),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
	},
}));

export default function Menu() {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="static" color="default" elevation={0} className={classes.appBar}>
				<Toolbar className={classes.toolbar}>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						Company name
					</Typography>
					<nav>
						<Link
							variant="button"
							color="textPrimary"
							href="#"
							className={classes.link}
						>
							Features
						</Link>
						<Link
							variant="button"
							color="textPrimary"
							href="#"
							className={classes.link}
						>
							Enterprise
						</Link>
						<Link
							variant="button"
							color="textPrimary"
							href="#"
							className={classes.link}
						>
							Support
						</Link>
					</nav>
					<Button href="#" color="primary" variant="outlined" className={classes.link}>
						Login
					</Button>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}
