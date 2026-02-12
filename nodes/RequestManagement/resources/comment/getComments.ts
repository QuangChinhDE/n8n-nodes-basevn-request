import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { cleanBody } from '../../shared/utils';
import { postIdDescription } from '../../shared/descriptions';

export const getCommentsDescription: INodeProperties[] = [
	{
		...postIdDescription,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['getComments'],
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
				operation: ['getComments'],
			},
		},
		options: [
			{
				displayName: 'Method',
				name: 'method',
				type: 'options',
				options: [
					{
						name: 'Page',
						value: 'page',
					},
					{
						name: 'Previous',
						value: 'prev',
					},
				],
				default: 'page',
				description: 'Pagination method',
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'string',
				default: '',
				description: 'Position for pagination',
			},
		],
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	const postId = this.getNodeParameter('postId', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const body: IDataObject = cleanBody({
		post_id: postId,
		...additionalFields,
	});

	const responseData = await requestManagementApiRequest.call(
		this,
		'POST',
		'/request/comment/load',
		body,
	);

	// API returns max 10 comments per request
	if (responseData.comments && Array.isArray(responseData.comments)) {
		responseData.comments.forEach((comment: IDataObject) => {
			returnData.push({
				json: comment,
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
