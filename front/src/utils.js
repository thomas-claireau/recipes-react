export class ApiErrors {
	constructor(errors) {
		this.errors = errors;
	}
}

export async function apiFetch(endpoint, options = {}) {
	const { REACT_APP_API_HOST } = process.env;
	const apiOptions = {
		...options,
		credentials: 'include',
		headers: {
			Accept: 'application/json',
		},
	};

	const response = await fetch(REACT_APP_API_HOST + endpoint, apiOptions);
	const responseData = await response.json();

	if (response.ok) {
		return responseData;
	} else {
		throw new ApiErrors(responseData.errors);
	}
}
