import React from 'react';
import Header from '../Header/Header';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function Footer() {
	return (
		<footer>
			<Box pt={4}>
				<Typography variant="body2" color="textSecondary" align="center">
					{'Copyright © '}
					<Link color="inherit" href="https://material-ui.com/">
						Recettes React
					</Link>{' '}
					{new Date().getFullYear()}
					{'.'}
				</Typography>
			</Box>
		</footer>
	);
}

export default function Site({ children }) {
	return (
		<>
			<CssBaseline />
			<Header />

			{children}

			<Footer />
		</>
	);
}
