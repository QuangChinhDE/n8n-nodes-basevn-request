"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const utils_1 = require("../../shared/utils");
const descriptions_1 = require("../../shared/descriptions");
exports.getDescription = [
    {
        ...descriptions_1.requestIdDescription,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['get'],
            },
        },
    },
];
async function execute(index) {
    const returnData = [];
    const requestId = this.getNodeParameter('requestId', index);
    const body = (0, utils_1.cleanBody)({
        id: requestId,
    });
    const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/get', body);
    if (response.code === 200 && response.data) {
        returnData.push({
            json: response.data,
            pairedItem: index,
        });
    }
    else {
        throw new Error(`API Error: ${response.message || 'Unknown error'}`);
    }
    return returnData;
}
//# sourceMappingURL=get.js.map