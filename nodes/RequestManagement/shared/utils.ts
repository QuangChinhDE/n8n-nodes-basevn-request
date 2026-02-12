import type { IDataObject } from 'n8n-workflow';

/**
 * Convert snake_case to camelCase
 */
export function snakeToCamel(obj: IDataObject): IDataObject {
	const newObj: IDataObject = {};
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
			newObj[camelKey] = obj[key];
		}
	}
	return newObj;
}

/**
 * Clean and prepare body parameters (remove undefined/null values)
 */
export function cleanBody(body: IDataObject): IDataObject {
	const cleanedBody: IDataObject = {};
	for (const key in body) {
		if (body[key] !== undefined && body[key] !== null && body[key] !== '') {
			cleanedBody[key] = body[key];
		}
	}
	return cleanedBody;
}

/**
 * Format error message from API response
 */
export function handleApiError(error: Error & { response?: { status: number; statusText?: string } }): string {
	if (error.response) {
		return `API Error: ${error.response.status} - ${error.response.statusText || 'Unknown error'}`;
	}
	return error.message || 'Unknown error occurred';
}
