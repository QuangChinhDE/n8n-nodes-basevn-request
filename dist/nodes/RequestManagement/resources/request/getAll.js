"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const descriptions_1 = require("../../shared/descriptions");
const utils_1 = require("../../shared/utils");
exports.getAllDescription = [
    {
        ...descriptions_1.returnAllDescription,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['getAll'],
            },
        },
    },
    {
        ...descriptions_1.pageDescription,
        displayOptions: {
            show: {
                resource: ['request'],
                operation: ['getAll'],
                returnAll: [false],
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
    const returnAll = this.getNodeParameter('returnAll', index, false);
    const additionalFields = this.getNodeParameter('additionalFields', index, {});
    let responseData;
    const bodyBase = {
        ...additionalFields,
    };
    if (returnAll) {
        responseData = await transport_1.requestManagementApiRequestWithPagination.call(this, '/request/list', bodyBase, 'data');
    }
    else {
        const page = this.getNodeParameter('page', index, 0);
        const body = (0, utils_1.cleanBody)({ ...bodyBase, page });
        const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/request/list', body);
        if (response.code === 200 && response.data) {
            responseData = response.data;
        }
        else {
            throw new Error(`API Error: ${response.message || 'Unknown error'}`);
        }
    }
    if (Array.isArray(responseData)) {
        responseData.forEach((item) => {
            returnData.push({
                json: item,
                pairedItem: index,
            });
        });
    }
    return returnData;
}
//# sourceMappingURL=getAll.js.map