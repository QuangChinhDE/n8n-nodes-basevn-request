"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDirectDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const utils_1 = require("../../shared/utils");
const descriptions_1 = require("../../shared/descriptions");
exports.createDirectDescription = [
    {
        ...descriptions_1.groupIdDescription,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['createDirect'],
            },
        },
    },
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['createDirect'],
            },
        },
        description: 'The title of the request',
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
                operation: ['createDirect'],
            },
        },
        options: [
            {
                displayName: 'Description',
                name: 'description',
                type: 'string',
                typeOptions: {
                    rows: 4,
                },
                default: '',
                description: 'The description of the request',
            },
            {
                displayName: 'Priority',
                name: 'priority',
                type: 'options',
                options: [
                    {
                        name: 'Low',
                        value: 'low',
                    },
                    {
                        name: 'Normal',
                        value: 'normal',
                    },
                    {
                        name: 'High',
                        value: 'high',
                    },
                    {
                        name: 'Urgent',
                        value: 'urgent',
                    },
                ],
                default: 'normal',
                description: 'The priority of the request',
            },
        ],
    },
];
async function execute(index) {
    const returnData = [];
    const groupId = this.getNodeParameter('groupId', index);
    const title = this.getNodeParameter('title', index);
    const additionalFields = this.getNodeParameter('additionalFields', index, {});
    const body = (0, utils_1.cleanBody)({
        group_id: groupId,
        title,
        ...additionalFields,
    });
    const responseData = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/direct/create', body);
    returnData.push({
        json: responseData || { success: true },
        pairedItem: index,
    });
    return returnData;
}
//# sourceMappingURL=createDirect.js.map