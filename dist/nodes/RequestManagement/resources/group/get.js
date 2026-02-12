"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const utils_1 = require("../../shared/utils");
const descriptions_1 = require("../../shared/descriptions");
exports.getDescription = [
    {
        ...descriptions_1.groupIdDescription,
        displayOptions: {
            show: {
                resource: ['group'],
                operation: ['get'],
            },
        },
    },
    {
        ...descriptions_1.groupGetSelectorDescription,
        displayOptions: {
            show: {
                resource: ['group'],
                operation: ['get'],
            },
        },
    },
];
async function execute(index) {
    const returnData = [];
    const groupId = this.getNodeParameter('groupId', index);
    const selector = this.getNodeParameter('responseSelector', index, '');
    const body = (0, utils_1.cleanBody)({
        id: groupId,
    });
    const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/group/get', body);
    if (response.code === 1) {
        const result = (0, utils_1.processResponse)(response, selector);
        if (Array.isArray(result)) {
            result.forEach((item) => {
                returnData.push({
                    json: item,
                    pairedItem: index,
                });
            });
        }
        else {
            returnData.push({
                json: result,
                pairedItem: index,
            });
        }
    }
    else {
        throw new Error(`API Error: ${response.message || 'Unknown error'}`);
    }
    return returnData;
}
//# sourceMappingURL=get.js.map