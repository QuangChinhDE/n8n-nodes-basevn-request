"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostsDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const utils_1 = require("../../shared/utils");
const descriptions_1 = require("../../shared/descriptions");
exports.getPostsDescription = [
    {
        ...descriptions_1.requestIdDescription,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['getPosts'],
            },
        },
    },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['getPosts'],
            },
        },
        options: [
            {
                displayName: 'Last ID',
                name: 'lastId',
                type: 'string',
                default: '',
                description: 'Load posts older than this ID (for pagination)',
            },
        ],
    },
];
async function execute(index) {
    const returnData = [];
    const requestId = this.getNodeParameter('requestId', index);
    const additionalFields = this.getNodeParameter('additionalFields', index, {});
    const body = (0, utils_1.cleanBody)({
        request_id: requestId,
        ...additionalFields,
    });
    const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/post/load', body);
    if (response.code === 200) {
        const data = (response.data || response);
        if (data.posts && Array.isArray(data.posts)) {
            data.posts.forEach((post) => {
                returnData.push({
                    json: post,
                    pairedItem: index,
                });
            });
        }
        else {
            returnData.push({
                json: data,
                pairedItem: index,
            });
        }
    }
    else {
        throw new Error(`API Error: ${response.message || 'Unknown error'}`);
    }
    return returnData;
}
//# sourceMappingURL=getPosts.js.map