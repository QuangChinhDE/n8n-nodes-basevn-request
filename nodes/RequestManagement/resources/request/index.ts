import type { INodeProperties } from 'n8n-workflow';
import * as get from './get';
import * as getAll from './getAll';
import * as createCustom from './createCustom';
import * as getWithCustomTable from './getWithCustomTable';
import * as addFollower from './addFollower';
import * as getPosts from '../post/getPosts';
import * as getComments from '../comment/getComments';

export const description: INodeProperties[] = [
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

export { get, getAll, createCustom, getWithCustomTable, addFollower, getPosts, getComments };
