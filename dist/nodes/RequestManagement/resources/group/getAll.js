"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const descriptions_1 = require("../../shared/descriptions");
const utils_1 = require("../../shared/utils");
exports.getAllDescription = [
    {
        ...descriptions_1.pageDescription,
        displayOptions: {
            show: {
                resource: ['group'],
                operation: ['getAll'],
            },
        },
    },
];
async function execute(index) {
    const returnData = [];
    const page = this.getNodeParameter('page', index, 0);
    const body = (0, utils_1.cleanBody)({ page });
    const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/group/list', body);
    if (response.code === 1 && response.groups) {
        const responseData = response.groups;
        if (Array.isArray(responseData)) {
            responseData.forEach((item) => {
                returnData.push({
                    json: item,
                    pairedItem: index,
                });
            });
        }
        else {
            returnData.push({
                json: responseData,
                pairedItem: index,
            });
        }
    }
    else {
        throw new Error(`API Error: ${response.message || 'Unknown error'}`);
    }
    return returnData;
}
//# sourceMappingURL=getAll.js.map