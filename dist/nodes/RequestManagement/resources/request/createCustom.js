"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const utils_1 = require("../../shared/utils");
exports.createCustomDescription = [
    {
        displayName: 'Username',
        name: 'username',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['createCustom'],
            },
        },
        description: 'Username of request creator',
    },
    {
        displayName: 'Group ID',
        name: 'group_id',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['createCustom'],
            },
        },
        description: 'ID of the group to create request in',
    },
    {
        displayName: 'Request Name',
        name: 'name',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['createCustom'],
            },
        },
        description: 'Name/title of the request',
    },
    {
        displayName: 'Direct Managers',
        name: 'direct_managers',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['createCustom'],
            },
        },
        description: 'Direct managers usernames (space-separated, e.g., "hung admin"). Required if group requires direct managers.',
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
                displayName: 'Content',
                name: 'content',
                type: 'string',
                typeOptions: {
                    rows: 4,
                },
                default: '',
                description: 'Description/content of the request',
            },
            {
                displayName: 'Followers',
                name: 'followers',
                type: 'string',
                default: '',
                description: 'Follower usernames (space-separated, e.g., "trangpham haphuong")',
            },
        ],
    },
    {
        displayName: 'Custom Fields',
        name: 'customFields',
        type: 'fixedCollection',
        typeOptions: {
            multipleValues: true,
        },
        placeholder: 'Add Custom Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['createCustom'],
            },
        },
        description: 'Custom fields specific to the group (e.g., custom_so_luong_thiet_bi, custom_tong_chi_phi)',
        options: [
            {
                name: 'fields',
                displayName: 'Field',
                values: [
                    {
                        displayName: 'Field Name',
                        name: 'name',
                        type: 'string',
                        default: '',
                        placeholder: 'e.g., custom_so_luong_thiet_bi',
                        description: 'Name of the custom field (must start with custom_)',
                    },
                    {
                        displayName: 'Field Value',
                        name: 'value',
                        type: 'string',
                        default: '',
                        description: 'Value of the custom field',
                    },
                ],
            },
        ],
    },
];
async function execute(index) {
    const returnData = [];
    const username = this.getNodeParameter('username', index);
    const groupId = this.getNodeParameter('group_id', index);
    const name = this.getNodeParameter('name', index);
    const directManagers = this.getNodeParameter('direct_managers', index, '');
    const additionalFields = this.getNodeParameter('additionalFields', index, {});
    const customFieldsData = this.getNodeParameter('customFields', index, {});
    const customFields = {};
    if (customFieldsData.fields && Array.isArray(customFieldsData.fields)) {
        for (const field of customFieldsData.fields) {
            if (field.name && field.value) {
                customFields[field.name] = field.value;
            }
        }
    }
    const body = (0, utils_1.cleanBody)({
        username,
        group_id: groupId,
        name,
        direct_managers: directManagers,
        ...additionalFields,
        ...customFields,
    });
    const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/create', body);
    if (response.code === 1) {
        returnData.push({
            json: (0, utils_1.processResponse)(response, ''),
            pairedItem: index,
        });
    }
    else {
        throw new Error(`API Error: ${response.message || 'Unknown error'}`);
    }
    return returnData;
}
//# sourceMappingURL=createCustom.js.map