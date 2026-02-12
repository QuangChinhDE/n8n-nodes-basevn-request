"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const utils_1 = require("../../shared/utils");
const descriptions_1 = require("../../shared/descriptions");
exports.getCommentsDescription = [
    {
        ...descriptions_1.postIdDescription,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['getComments'],
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
                operation: ['getComments'],
            },
        },
        options: [
            {
                displayName: 'Method',
                name: 'method',
                type: 'options',
                options: [
                    {
                        name: 'Page',
                        value: 'page',
                    },
                    {
                        name: 'Previous',
                        value: 'prev',
                    },
                ],
                default: 'page',
                description: 'Pagination method',
            },
            {
                displayName: 'Position',
                name: 'position',
                type: 'string',
                default: '',
                description: 'Position for pagination',
            },
        ],
    },
];
async function execute(index) {
    const returnData = [];
    const postId = this.getNodeParameter('postId', index);
    const additionalFields = this.getNodeParameter('additionalFields', index, {});
    const body = (0, utils_1.cleanBody)({
        post_id: postId,
        ...additionalFields,
    });
    const responseData = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/comment/load', body);
    if (responseData.comments && Array.isArray(responseData.comments)) {
        responseData.comments.forEach((comment) => {
            returnData.push({
                json: comment,
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
    return returnData;
}
//# sourceMappingURL=getComments.js.map