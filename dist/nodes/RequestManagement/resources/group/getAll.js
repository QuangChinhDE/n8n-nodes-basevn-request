"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDescription = void 0;
exports.execute = execute;
const transport_1 = require("../../shared/transport");
const descriptions_1 = require("../../shared/descriptions");
const utils_1 = require("../../shared/utils");
exports.getAllDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['group'],
            },
        },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                description: 'Get many groups',
                action: 'Get many groups',
            },
        ],
        default: 'getAll',
    },
    {
        ...descriptions_1.returnAllDescription,
        displayOptions: {
            show: {
                resource: ['group'],
                operation: ['getAll'],
            },
        },
    },
    {
        ...descriptions_1.pageDescription,
        displayOptions: {
            show: {
                resource: ['group'],
                operation: ['getAll'],
                returnAll: [false],
            },
        },
    },
];
async function execute(index) {
    const returnData = [];
    const returnAll = this.getNodeParameter('returnAll', index, false);
    let responseData;
    if (returnAll) {
        responseData = await transport_1.requestManagementApiRequestWithPagination.call(this, '/group/list', {}, 'data');
    }
    else {
        const page = this.getNodeParameter('page', index, 0);
        const body = (0, utils_1.cleanBody)({ page });
        const response = await transport_1.requestManagementApiRequest.call(this, 'POST', '/group/list', body);
        responseData = response.data || [];
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