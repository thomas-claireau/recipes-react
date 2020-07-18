import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	chips: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	chip: {
		margin: 2,
	},
	noLabel: {
		marginTop: theme.spacing(3),
	},
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
		},
	},
};

export default function MultipleSelect({ list, data, name }) {
	const classes = useStyles();
	const [state, setState] = React.useState(null);
	const [items, setItems] = React.useState(data);

	const handleChange = (event) => {
		setItems(event.target.value);
	};

	React.useEffect(() => {
		list.then((data) => {
			setState(data.map((item) => item.title));
		});
	}, [list]);

	if (state === null) return null;

	return (
		<div>
			<InputLabel id="demo-mutiple-chip-label">Ingredients</InputLabel>
			<Select
				labelId="demo-mutiple-chip-label"
				id={name}
				name={name}
				multiple
				value={items}
				onChange={handleChange}
				input={<Input id="select-multiple-chip" />}
				renderValue={(selected) => (
					<div className={classes.chips}>
						{selected.map((value) => (
							<Chip key={value} label={value} className={classes.chip} />
						))}
					</div>
				)}
				MenuProps={MenuProps}
			>
				{state.map((item) => (
					<MenuItem key={item} value={item}>
						{item}
					</MenuItem>
				))}
			</Select>
		</div>
	);
}

MultipleSelect.propTypes = {
	list: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired,
	name: PropTypes.string.isRequired,
};
