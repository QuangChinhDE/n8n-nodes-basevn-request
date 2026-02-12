import type { INodeProperties } from 'n8n-workflow';
import * as get from './get';
import * as getAll from './getAll';
import * as createDirect from './createDirect';
import * as createCustom from './createCustom';
import * as getWithCustomTable from './getWithCustomTable';
import * as addFollower from './addFollower';
import * as getPosts from '../post/getPosts';
import * as getComments from '../comment/getComments';

export const description: INodeProperties[] = [
	{
		displayName: 'Sub-Resource',
		name: 'subResource',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['request'],
			},
		},
		options: [
			{
				name: 'Direct',
				value: 'direct',
			},
			{
				name: 'Post',
				value: 'post',
			},
			{
				name: 'Comment',
				value: 'comment',
			},
			{
				name: 'Request',
				value: 'request',
			},
		],
		default: 'request',
	},
	// Direct operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['request'],
				subResource: ['direct'],
			},
		},
		options: [
			{
				name: 'Create a New Request by Direct Group',
				value: 'createDirect',
				action: 'Create a new request by direct group',
			},
		],
		default: 'createDirect',
	},
	// Post operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['request'],
				subResource: ['post'],
			},
		},
		options: [
			{
				name: 'Get Posts of Request',
				value: 'getPosts',
				action: 'Get posts of request',
			},
		],
		default: 'getPosts',
	},
	// Comment operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['request'],
				subResource: ['comment'],
			},
		},
		options: [
			{
				name: 'Get Comments of Post',
				value: 'getComments',
				action: 'Get comments of post',
			},
		],
		default: 'getComments',
	},
	// Main Request operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['request'],
				subResource: ['request'],
			},
		},
		options: [
			{
				name: 'Add Follower to Request',
				value: 'addFollower',
				action: 'Add follower to request',
			},
			{
				name: 'Create a New Request by Custom Group',
				value: 'createCustom',
				action: 'Create a new request by custom group',
			},
			{
				name: 'Get Detail of Request by ID',
				value: 'get',
				action: 'Get detail of request by ID',
			},
			{
				name: 'Get Detail Request with Custom Table',
				value: 'getWithCustomTable',
				action: 'Get detail request with custom table',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'List all requests in system',
			},
		],
		default: 'get',
	},
	...get.getDescription,
	...getAll.getAllDescription,
	...createDirect.createDirectDescription,
	...createCustom.createCustomDescription,
	...getWithCustomTable.getWithCustomTableDescription,
	...addFollower.addFollowerDescription,
	...getPosts.getPostsDescription,
	...getComments.getCommentsDescription,
];

export { get, getAll, createDirect, createCustom, getWithCustomTable, addFollower, getPosts, getComments };
