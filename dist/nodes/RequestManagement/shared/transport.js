"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestManagementApiRequest = requestManagementApiRequest;
exports.requestManagementApiRequestWithPagination = requestManagementApiRequestWithPagination;
async function requestManagementApiRequest(method, endpoint, body = {}) {
    const credentials = await this.getCredentials('requestManagementApi');
    const domain = credentials.domain;
    const accessToken = credentials.accessToken;
    const requestBody = {
        access_token_v2: accessToken,
        ...body,
    };
    const options = {
        method,
        url: `https://request.${domain}/extapi/v1${endpoint}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
    };
    return await this.helpers.httpRequest(options);
}
async function requestManagementApiRequestWithPagination(endpoint, body = {}, propertyName = 'data') {
    let page = 0;
    const returnData = [];
    let responseData;
    do {
        const requestBody = { ...body, page };
        responseData = await requestManagementApiRequest.call(this, 'POST', endpoint, requestBody);
        if (responseData[propertyName] && Array.isArray(responseData[propertyName])) {
            returnData.push(...responseData[propertyName]);
        }
        page++;
    } while (responseData[propertyName] &&
        Array.isArray(responseData[propertyName]) &&
        responseData[propertyName].length > 0);
    return returnData;
}
//# sourceMappingURL=transport.js.map