import type { INodeProperties } from 'n8n-workflow';

/**
 * Common field descriptions used across resources
 */

export const groupIdDescription: INodeProperties = {
	displayName: 'Group ID',
	name: 'groupId',
	type: 'string',
	default: '',
	required: true,
	description: 'The ID of the group',
};

export const requestIdDescription: INodeProperties = {
	displayName: 'Request ID',
	name: 'requestId',
	type: 'string',
	default: '',
	required: true,
	description: 'The ID of the request',
};

export const postIdDescription: INodeProperties = {
	displayName: 'Post ID',
	name: 'postId',
	type: 'string',
	default: '',
	required: true,
	description: 'The ID of the post',
};

export const pageDescription: INodeProperties = {
	displayName: 'Page',
	name: 'page',
	type: 'number',
	default: 0,
	description: 'Page number for pagination (starts from 0)',
};

export const returnAllDescription: INodeProperties = {
	displayName: 'Return All',
	name: 'returnAll',
	type: 'boolean',
	default: false,
	description: 'Whether to return all results or only up to a given limit',
};
