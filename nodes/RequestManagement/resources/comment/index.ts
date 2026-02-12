import type { INodeProperties } from 'n8n-workflow';
import * as getComments from './getComments';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['comment'],
			},
		},
		options: [
			{
				name: 'Get Comments',
				value: 'getComments',
				description: 'Get comments of a post',
				action: 'Get comments of post',
			},
		],
		default: 'getComments',
	},
	...getComments.getCommentsDescription,
];

export { getComments };
