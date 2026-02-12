"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFollowerDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const utils_1 = require("../../shared/utils");
const descriptions_1 = require("../../shared/descriptions");
exports.addFollowerDescription = [
    {
        displayName: 'Request ID',
        name: 'id',
        type: 'number',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['addFollower'],
            },
        },
        description: 'ID của đề xuất (mã đề xuất)',
    },
    {
        displayName: 'Username',
        name: 'username',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['addFollower'],
            },
        },
        description: 'Username của người add follower (phân quyền thao tác phụ thuộc vào Advanced settings của request group)',
    },
    {
        displayName: 'Followers',
        name: 'followers',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['addFollower'],
            },
        },
        description: 'Username của (những) người được add follower. Cách nhau bằng dấu phẩy hoặc dấu cách. Giới hạn add 20 users trong 1 lần call API.',
        placeholder: 'linhdan minhchau hoặc linhdan,minhchau',
    },
    descriptions_1.addFollowerSelectorDescription,
];
async function execute(index) {
    const returnData = [];
    const id = this.getNodeParameter('id', index);
    const username = this.getNodeParameter('username', index);
    const followers = this.getNodeParameter('followers', index);
    const selector = this.getNodeParameter('responseSelector', index, '');
    const body = (0, utils_1.cleanBody)({
        id,
        username,
        followers,
    });
    const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/add.follower', body);
    if (response.code === 1) {
        const result = (0, utils_1.processResponse)(response, selector);
        returnData.push({
            json: result,
            pairedItem: index,
        });
    }
    else {
        throw new Error(`API Error: ${response.message || 'Unknown error'}. Full response: ${JSON.stringify(response)}`);
    }
    return returnData;
}
//# sourceMappingURL=addFollower.js.map