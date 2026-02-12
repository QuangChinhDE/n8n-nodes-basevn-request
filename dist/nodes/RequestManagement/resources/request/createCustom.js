"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const utils_1 = require("../../shared/utils");
const descriptions_1 = require("../../shared/descriptions");
exports.createCustomDescription = [
    {
        ...descriptions_1.groupIdDescription,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['createCustom'],
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
                operation: ['createCustom'],
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
                operation: ['createCustom'],
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
                displayName: 'Custom Fields',
                name: 'customFields',
                type: 'string',
                default: '',
                description: 'Custom fields as JSON string',
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
    const responseData = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/create', body);
    returnData.push({
        json: responseData || { success: true },
        pairedItem: index,
    });
    return returnData;
}
//# sourceMappingURL=createCustom.js.map