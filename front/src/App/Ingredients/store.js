import { apiFetch } from '../../utils';

export function add({ type, data }, dispatch, setError) {
	apiFetch('/ingredients', {
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
	apiFetch(`/ingredients/${id}`, {
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
	apiFetch(`/ingredients/${id}`, {
		method: 'DELETE',
	})
		.then(() => {
			dispatch({ type, payload: id });
		})
		.catch((e) => {
			setError({ type, code: e.errors.code, message: e.errors.message });
		});
}
