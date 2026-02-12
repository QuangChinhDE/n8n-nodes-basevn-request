import type { INodeProperties } from 'n8n-workflow';
import * as getPosts from './getPosts';

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['post'],
			},
		},
		options: [
			{
				name: 'Get Posts',
				value: 'getPosts',
				description: 'Get posts of a request',
				action: 'Get posts of request',
			},
		],
		default: 'getPosts',
	},
	...getPosts.getPostsDescription,
];

export { getPosts };
