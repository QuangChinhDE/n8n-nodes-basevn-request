"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWithCustomTableDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const utils_1 = require("../../shared/utils");
const descriptions_1 = require("../../shared/descriptions");
exports.getWithCustomTableDescription = [
    {
        ...descriptions_1.requestIdDescription,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['getWithCustomTable'],
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
    const responseData = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/custom.table', body);
    returnData.push({
        json: responseData,
        pairedItem: index,
    });
    return returnData;
}
//# sourceMappingURL=getWithCustomTable.js.map