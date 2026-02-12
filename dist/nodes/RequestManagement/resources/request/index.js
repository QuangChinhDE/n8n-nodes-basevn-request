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
exports.getComments = exports.getPosts = exports.addFollower = exports.getWithCustomTable = exports.createCustom = exports.getAll = exports.get = exports.description = void 0;
const get = __importStar(require("./get"));
exports.get = get;
const getAll = __importStar(require("./getAll"));
exports.getAll = getAll;
const createCustom = __importStar(require("./createCustom"));
exports.createCustom = createCustom;
const getWithCustomTable = __importStar(require("./getWithCustomTable"));
exports.getWithCustomTable = getWithCustomTable;
const addFollower = __importStar(require("./addFollower"));
exports.addFollower = addFollower;
const getPosts = __importStar(require("../post/getPosts"));
exports.getPosts = getPosts;
const getComments = __importStar(require("../comment/getComments"));
exports.getComments = getComments;
exports.description = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['request'],
            },
        },
        options: [
            {
                name: 'Add Follower to Request',
                value: 'addFollower',
                action: 'Add follower to request',
            },
            {
                name: 'Create Request',
                value: 'createCustom',
                action: 'Create a new request',
            },
            {
                name: 'Get',
                value: 'get',
                action: 'Get detail of request by ID',
            },
            {
                name: 'Get Comments of Post',
                value: 'getComments',
                action: 'Get comments of post',
            },
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'List all requests in system',
            },
            {
                name: 'Get Posts of Request',
                value: 'getPosts',
                action: 'Get posts of request',
            },
            {
                name: 'Get with Custom Table',
                value: 'getWithCustomTable',
                action: 'Get detail request with custom table',
            },
        ],
        default: 'get',
    },
    ...get.getDescription,
    ...getAll.getAllDescription,
    ...createCustom.createCustomDescription,
    ...getWithCustomTable.getWithCustomTableDescription,
    ...addFollower.addFollowerDescription,
    ...getPosts.getPostsDescription,
    ...getComments.getCommentsDescription,
];
//# sourceMappingURL=index.js.map