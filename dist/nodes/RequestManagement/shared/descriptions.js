"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFollowerSelectorDescription = exports.commentLoadSelectorDescription = exports.postLoadSelectorDescription = exports.requestCustomTableSelectorDescription = exports.requestGetSelectorDescription = exports.requestListSelectorDescription = exports.groupGetSelectorDescription = exports.groupListSelectorDescription = exports.returnAllDescription = exports.pageDescription = exports.postIdDescription = exports.requestIdDescription = exports.groupIdDescription = void 0;
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
    displayName: 'Post HID',
    name: 'postHid',
    type: 'string',
    default: '',
    required: true,
    description: 'The HID of the post (hid field from post object)',
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
exports.groupListSelectorDescription = {
    displayName: 'Response Selector',
    name: 'responseSelector',
    type: 'options',
    options: [
        { name: 'Full Response', value: '' },
        { name: 'Groups Array', value: 'groups' },
    ],
    default: '',
    description: 'Select which field to return from response. Leave empty for full response.',
};
exports.groupGetSelectorDescription = {
    displayName: 'Response Selector',
    name: 'responseSelector',
    type: 'options',
    options: [
        { name: 'Full Response', value: '' },
        { name: 'Group Object', value: 'group' },
    ],
    default: '',
    description: 'Select which field to return from response. Leave empty for full response.',
};
exports.requestListSelectorDescription = {
    displayName: 'Response Selector',
    name: 'responseSelector',
    type: 'options',
    options: [
        { name: 'Full Response', value: '' },
        { name: 'Requests Array', value: 'requests' },
    ],
    default: '',
    description: 'Select which field to return from response. Leave empty for full response.',
};
exports.requestGetSelectorDescription = {
    displayName: 'Response Selector',
    name: 'responseSelector',
    type: 'options',
    options: [
        { name: 'Approver Followings', value: 'approver_followings' },
        { name: 'E-Sign Requests', value: 'esign_requests' },
        { name: 'Extra Approvers', value: 'extra_approvers' },
        { name: 'Files', value: 'files' },
        { name: 'Full Response', value: '' },
        { name: 'Group Object', value: 'group' },
        { name: 'Request Object', value: 'request' },
    ],
    default: '',
    description: 'Select which field to return from response. Leave empty for full response.',
};
exports.requestCustomTableSelectorDescription = {
    displayName: 'Response Selector',
    name: 'responseSelector',
    type: 'options',
    options: [
        { name: 'Custom Table', value: 'custom_table' },
        { name: 'E-Sign Requests', value: 'esign_requests' },
        { name: 'Full Response', value: '' },
        { name: 'Group Object', value: 'group' },
        { name: 'Request Object', value: 'request' },
    ],
    default: '',
    description: 'Select which field to return from response. Leave empty for full response.',
};
exports.postLoadSelectorDescription = {
    displayName: 'Response Selector',
    name: 'responseSelector',
    type: 'options',
    options: [
        { name: 'Full Response', value: '' },
        { name: 'Posts Array', value: 'posts' },
        { name: 'Origin Request', value: 'origin' },
    ],
    default: '',
    description: 'Select which field to return from response. Leave empty for full response.',
};
exports.commentLoadSelectorDescription = {
    displayName: 'Response Selector',
    name: 'responseSelector',
    type: 'options',
    options: [
        { name: 'Full Response', value: '' },
        { name: 'Comments Array', value: 'comments' },
        { name: 'Origin Post', value: 'origin' },
    ],
    default: '',
    displayOptions: {
        show: {
            resource: ['request'],
            operation: ['getComments'],
        },
    },
    description: 'Select which field to return from response. Leave empty for full response.',
};
exports.addFollowerSelectorDescription = {
    displayName: 'Response Selector',
    name: 'responseSelector',
    type: 'options',
    options: [
        { name: 'Full Response', value: '' },
    ],
    default: '',
    displayOptions: {
        show: {
            resource: ['request'],
            operation: ['addFollower'],
        },
    },
    description: 'Select which field to return from response. Leave empty for full response.',
};
//# sourceMappingURL=descriptions.js.map