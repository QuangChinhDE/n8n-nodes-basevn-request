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
    {
        ...descriptions_1.commentLoadSelectorDescription, displayOptions: {
            show: {
                resource: ['request'],
                operation: ['getComments'],
            },
        },
    },
];
async function execute(index) {
    const returnData = [];
    const postHid = this.getNodeParameter('postHid', index);
    const additionalFields = this.getNodeParameter('additionalFields', index, {});
    const selector = this.getNodeParameter('responseSelector', index, '');
    const body = (0, utils_1.cleanBody)({
        hid: postHid,
        ...additionalFields,
    });
    const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/comment/load', body);
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
//# sourceMappingURL=getComments.js.map