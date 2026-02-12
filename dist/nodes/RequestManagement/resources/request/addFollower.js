"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFollowerDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const utils_1 = require("../../shared/utils");
const descriptions_1 = require("../../shared/descriptions");
exports.addFollowerDescription = [
    {
        ...descriptions_1.requestIdDescription,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['addFollower'],
            },
        },
    },
    {
        displayName: 'Follower ID',
        name: 'followerId',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['addFollower'],
            },
        },
        description: 'The ID of the user to add as follower',
    },
];
async function execute(index) {
    const returnData = [];
    const requestId = this.getNodeParameter('requestId', index);
    const followerId = this.getNodeParameter('followerId', index);
    const body = (0, utils_1.cleanBody)({
        request_id: requestId,
        follower_id: followerId,
    });
    const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/add.follower', body);
    if (response.code === 200) {
        returnData.push({
            json: (response.data || response),
            pairedItem: index,
        });
    }
    else {
        throw new Error(`API Error: ${response.message || 'Unknown error'}`);
    }
    return returnData;
}
//# sourceMappingURL=addFollower.js.map