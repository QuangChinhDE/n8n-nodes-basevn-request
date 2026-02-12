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
                displayName: 'Filter',
                name: 'filter',
                type: 'string',
                default: '',
                description: 'Filter condition for requests',
            },
            {
                displayName: 'Status',
                name: 'status',
                type: 'string',
                default: '',
                description: 'Filter by request status',
            },
        ],
    },
];
async function execute(index) {
    const returnData = [];
    const page = this.getNodeParameter('page', index, 0);
    const additionalFields = this.getNodeParameter('additionalFields', index, {});
    const body = (0, utils_1.cleanBody)({
        page,
        ...additionalFields,
    });
    const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/list', body);
    if (response.code === 1 && response.requests) {
        const responseData = response.requests;
        if (Array.isArray(responseData)) {
            responseData.forEach((item) => {
                returnData.push({
                    json: item,
                    pairedItem: index,
                });
            });
        }
    }
    else {
        throw new Error(`API Error: ${response.message || 'Unknown error'}`);
    }
    return returnData;
}
//# sourceMappingURL=getAll.js.map