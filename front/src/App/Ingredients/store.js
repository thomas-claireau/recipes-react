import { apiFetch } from '../../utils';

const ROOT = '/ingredients';

export function reducer(state, action) {
	switch (action.type) {
		case 'load':
			return action.payload;
		case 'add':
			return [...state, action.payload];
		case 'update':
			return state.map((item) => {
				if (item == action.payload) return action.payload;

				return item;
			});
		case 'remove':
			return state.filter((item) => item.id !== action.payload);
		default:
			throw new Error(`L'action ${action.type} est inconnue`);
	}
}

export function add({ type, data }, dispatch, setError) {
	apiFetch(ROOT, {
		method: 'POST',
		body: data,
	})
		.then((ingredient) => {
			dispatch({ type, payload: ingredient });
		})
		.catch((e) => {
			setError({ type, code: e.errors.code, message: e.errors.message });
		});
}

export function update({ id, type, data }, dispatch, setError) {
	apiFetch(`${ROOT}/${id}`, {
		method: 'PUT',
		body: data,
	})
		.then((ingredient) => {
			dispatch({ type, payload: ingredient });
		})
		.catch((e) => {
			setError({ type, code: e.errors.code, message: e.errors.message });
		});
}

export function remove({ id, type }, dispatch, setError) {
	apiFetch(`${ROOT}/${id}`, {
		method: 'DELETE',
	})
		.then(() => {
			dispatch({ type, payload: id });
		})
		.catch((e) => {
			setError({ type, code: e.errors.code, message: e.errors.message });
		});
}
