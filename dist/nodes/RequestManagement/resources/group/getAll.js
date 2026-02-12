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
    {
        ...descriptions_1.groupListSelectorDescription,
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
    const selector = this.getNodeParameter('responseSelector', index, '');
    const body = (0, utils_1.cleanBody)({ page });
    const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/group/list', body);
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
//# sourceMappingURL=getAll.js.map