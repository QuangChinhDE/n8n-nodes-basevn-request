"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeToCamel = snakeToCamel;
exports.cleanBody = cleanBody;
exports.handleApiError = handleApiError;
function snakeToCamel(obj) {
    const newObj = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
            newObj[camelKey] = obj[key];
        }
    }
    return newObj;
}
function cleanBody(body) {
    const cleanedBody = {};
    for (const key in body) {
        if (body[key] !== undefined && body[key] !== null && body[key] !== '') {
            cleanedBody[key] = body[key];
        }
    }
    return cleanedBody;
}
function handleApiError(error) {
    if (error.response) {
        return `API Error: ${error.response.status} - ${error.response.statusText || 'Unknown error'}`;
    }
    return error.message || 'Unknown error occurred';
}
//# sourceMappingURL=utils.js.map