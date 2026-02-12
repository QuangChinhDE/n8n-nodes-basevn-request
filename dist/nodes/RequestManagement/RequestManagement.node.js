"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestManagement = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const group = __importStar(require("./resources/group"));
const request = __importStar(require("./resources/request"));
class RequestManagement {
    constructor() {
        this.description = {
            displayName: 'BaseVN - App Request',
            name: 'requestManagement',
            icon: 'file:../../icons/request.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
            description: 'Interact with BaseVN - App Request',
            defaults: {
                name: 'BaseVN - App Request',
            },
            usableAsTool: true,
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [
                {
                    name: 'requestManagementApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Group',
                            value: 'group',
                        },
                        {
                            name: 'Request',
                            value: 'request',
                        },
                    ],
                    default: 'group',
                },
                ...group.description,
                ...request.description,
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        for (let i = 0; i < items.length; i++) {
            try {
                let responseData = [];
                if (resource === 'group') {
                    const operation = this.getNodeParameter('operation', i);
                    if (operation === 'get') {
                        responseData = await group.get.execute.call(this, i);
                    }
                    else if (operation === 'getAll') {
                        responseData = await group.getAll.execute.call(this, i);
                    }
                }
                else if (resource === 'request') {
                    const operation = this.getNodeParameter('operation', i);
                    if (operation === 'get') {
                        responseData = await request.get.execute.call(this, i);
                    }
                    else if (operation === 'getAll') {
                        responseData = await request.getAll.execute.call(this, i);
                    }
                    else if (operation === 'createCustom') {
                        responseData = await request.createCustom.execute.call(this, i);
                    }
                    else if (operation === 'createDirect') {
                        responseData = await request.createDirect.execute.call(this, i);
                    }
                    else if (operation === 'getWithCustomTable') {
                        responseData = await request.getWithCustomTable.execute.call(this, i);
                    }
                    else if (operation === 'addFollower') {
                        responseData = await request.addFollower.execute.call(this, i);
                    }
                    else if (operation === 'getPosts') {
                        responseData = await request.getPosts.execute.call(this, i);
                    }
                    else if (operation === 'getComments') {
                        responseData = await request.getComments.execute.call(this, i);
                    }
                }
                returnData.push(...responseData);
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: { error: error.message },
                        pairedItem: i,
                    });
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
exports.RequestManagement = RequestManagement;
//# sourceMappingURL=RequestManagement.node.js.map