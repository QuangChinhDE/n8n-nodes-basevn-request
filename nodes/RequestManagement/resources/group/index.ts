import type { INodeProperties } from 'n8n-workflow';
import * as get from './get';
import * as getAll from './getAll';

export const description: INodeProperties[] = [
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
		],
		default: 'group',
	},
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
				name: 'Get Detail of Group Request by ID',
				value: 'get',
				action: 'Get detail of group request by ID',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'List all groups',
			},
		],
		default: 'get',
	},
	...get.getDescription,
	...getAll.getAllDescription,
];

export { get, getAll };
