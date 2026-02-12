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

	const response = await requestManagementApiRequest.call(
		this,
		'POST',
		'/request/comment/load',
		body,
	);

	// Handle response structure: { code: 200, message: "Success", data: {...} }
	if (response.code === 200) {
		const data = (response.data || response) as IDataObject;
		// API returns max 10 comments per request
		if (data.comments && Array.isArray(data.comments)) {
			(data.comments as IDataObject[]).forEach((comment: IDataObject) => {
				returnData.push({
					json: comment,
					pairedItem: index,
				});
			});
		} else {
			returnData.push({
				json: data,
				pairedItem: index,
			});
		}
	} else {
		throw new Error(`API Error: ${response.message || 'Unknown error'}`);
	}

	return returnData;
}
