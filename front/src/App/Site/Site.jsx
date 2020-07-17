import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

import './Site.scss';

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

export default function Site({ children, className }) {
	return (
		<>
			<CssBaseline />
			<Header />

			<section className="container-page-body">
				<section id="page-body" className={className}>
					{children}
				</section>

				<Footer />
			</section>
		</>
	);
}

Site.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string.isRequired,
};
