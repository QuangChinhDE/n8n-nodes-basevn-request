import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { cleanBody } from '../../shared/utils';
import { requestIdDescription } from '../../shared/descriptions';

export const getPostsDescription: INodeProperties[] = [
	{
		...requestIdDescription,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['getPosts'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['getPosts'],
			},
		},
		options: [
			{
				displayName: 'Last ID',
				name: 'lastId',
				type: 'string',
				default: '',
				description: 'Load posts older than this ID (for pagination)',
			},
		],
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	const requestId = this.getNodeParameter('requestId', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const body: IDataObject = cleanBody({
		request_id: requestId,
		...additionalFields,
	});

	const responseData = await requestManagementApiRequest.call(
		this,
		'POST',
		'/request/post/load',
		body,
	);

	// API returns max 10 posts per request
	if (responseData.posts && Array.isArray(responseData.posts)) {
		responseData.posts.forEach((post: IDataObject) => {
			returnData.push({
				json: post,
				pairedItem: index,
			});
		});
	} else {
		returnData.push({
			json: responseData,
			pairedItem: index,
		});
	}

	return returnData;
}
