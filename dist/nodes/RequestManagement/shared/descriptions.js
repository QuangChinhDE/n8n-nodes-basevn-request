"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnAllDescription = exports.pageDescription = exports.postIdDescription = exports.requestIdDescription = exports.groupIdDescription = void 0;
exports.groupIdDescription = {
    displayName: 'Group ID',
    name: 'groupId',
    type: 'string',
    default: '',
    required: true,
    description: 'The ID of the group',
};
exports.requestIdDescription = {
    displayName: 'Request ID',
    name: 'requestId',
    type: 'string',
    default: '',
    required: true,
    description: 'The ID of the request',
};
exports.postIdDescription = {
    displayName: 'Post ID',
    name: 'postId',
    type: 'string',
    default: '',
    required: true,
    description: 'The ID of the post',
};
exports.pageDescription = {
    displayName: 'Page',
    name: 'page',
    type: 'number',
    default: 0,
    description: 'Page number for pagination (starts from 0)',
};
exports.returnAllDescription = {
    displayName: 'Return All',
    name: 'returnAll',
    type: 'boolean',
    default: false,
    description: 'Whether to return all results or only up to a given limit',
};
//# sourceMappingURL=descriptions.js.map