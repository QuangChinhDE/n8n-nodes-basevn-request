"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const descriptions_1 = require("../../shared/descriptions");
const utils_1 = require("../../shared/utils");
exports.getAllDescription = [
    {
        ...descriptions_1.pageDescription,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['getAll'],
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
                operation: ['getAll'],
            },
        },
        options: [
            {
                displayName: 'Created From',
                name: 'created_from',
                type: 'number',
                default: '',
                description: 'Filter requests created from this timestamp (Unix timestamp)',
            },
            {
                displayName: 'Created To',
                name: 'created_to',
                type: 'number',
                default: '',
                description: 'Filter requests created to this timestamp (Unix timestamp)',
            },
            {
                displayName: 'Deadline From',
                name: 'deadline_from',
                type: 'number',
                default: '',
                description: 'Filter requests with deadline from this timestamp (Unix timestamp)',
            },
            {
                displayName: 'Deadline To',
                name: 'deadline_to',
                type: 'number',
                default: '',
                description: 'Filter requests with deadline to this timestamp (Unix timestamp)',
            },
            {
                displayName: 'Finish From',
                name: 'finish_from',
                type: 'number',
                default: '',
                description: 'Filter requests finished from this timestamp (Unix timestamp)',
            },
            {
                displayName: 'Finish To',
                name: 'finish_to',
                type: 'number',
                default: '',
                description: 'Filter requests finished to this timestamp (Unix timestamp)',
            },
            {
                displayName: 'Group',
                name: 'group',
                type: 'string',
                default: '',
                description: 'Filter by group ID',
            },
            {
                displayName: 'Limit',
                name: 'limit',
                type: 'number',
                typeOptions: {
                    minValue: 1,
                },
                default: 50,
                description: 'Max number of results to return',
            },
            {
                displayName: 'Search Query',
                name: 'q',
                type: 'string',
                default: '',
                description: 'Search query to filter requests',
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'string',
                default: '',
                description: 'Filter by request status',
            },
            {
                displayName: 'Updated From',
                name: 'updated_from',
                type: 'number',
                default: '',
                description: 'Filter requests updated from this timestamp (Unix timestamp)',
            },
            {
                displayName: 'Updated To',
                name: 'updated_to',
                type: 'number',
                default: '',
                description: 'Filter requests updated to this timestamp (Unix timestamp)',
            },
            {
                displayName: 'Users',
                name: 'users',
                type: 'string',
                default: '',
                description: 'Filter by usernames (comma-separated, e.g., admin,hungkien)',
            },
        ],
    },
    {
        ...descriptions_1.requestListSelectorDescription,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['getAll'],
            },
        },
    },
];
async function execute(index) {
    const returnData = [];
    const page = this.getNodeParameter('page', index, 0);
    const additionalFields = this.getNodeParameter('additionalFields', index, {});
    const selector = this.getNodeParameter('responseSelector', index, '');
    const body = (0, utils_1.cleanBody)({
        page,
        ...additionalFields,
    });
    const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/list', body);
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
//# sourceMappingURL=getAll.js.map