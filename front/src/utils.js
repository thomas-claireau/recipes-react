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

	if (response.status == 204) return;

	const responseData = await response.json();

	if (response.ok) {
		return responseData;
	} else {
		if (responseData.errors)
			throw new ApiErrors({
				message: responseData.errors[0].message,
				code: response.status,
			});

		throw new ApiErrors({ message: responseData.message, code: response.status });
	}
}

export function setDate(date) {
	return {
		date: date.toLocaleDateString(),
		time: date.toLocaleTimeString(),
	};
}
