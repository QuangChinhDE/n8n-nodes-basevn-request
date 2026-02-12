"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const utils_1 = require("../../shared/utils");
const descriptions_1 = require("../../shared/descriptions");
exports.getDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['group'],
            },
        },
        options: [
            {
                name: 'Get',
                value: 'get',
                description: 'Get a group by ID',
                action: 'Get a group',
            },
        ],
        default: 'get',
    },
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
    const responseData = await transport_1.requestManagementApiRequest.call(this, 'POST', '/group/get', body);
    returnData.push({
        json: responseData,
        pairedItem: index,
    });
    return returnData;
}
//# sourceMappingURL=get.js.map