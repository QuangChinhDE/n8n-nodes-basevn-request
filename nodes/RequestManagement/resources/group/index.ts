import type { INodeProperties } from 'n8n-workflow';
import * as get from './get';
import * as getAll from './getAll';

export const description: INodeProperties[] = [
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
				name: 'Get',
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
