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
];
async function execute(index) {
    const returnData = [];
    const groupId = this.getNodeParameter('groupId', index);
    const body = (0, utils_1.cleanBody)({
        id: groupId,
    });
    const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/group/get', body);
    if (response.code === 1 && response.group) {
        returnData.push({
            json: response.group,
            pairedItem: index,
        });
    }
    else {
        throw new Error(`API Error: ${response.message || 'Unknown error'}`);
    }
    return returnData;
}
//# sourceMappingURL=get.js.map