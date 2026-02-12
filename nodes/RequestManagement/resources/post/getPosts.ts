import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { cleanBody, processResponse } from '../../shared/utils';
import { requestIdDescription, postLoadSelectorDescription } from '../../shared/descriptions';

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
	{
		...postLoadSelectorDescription,		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['getPosts'],
			},		},
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	const requestId = this.getNodeParameter('requestId', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
	const selector = this.getNodeParameter('responseSelector', index, '') as string;

	const body: IDataObject = cleanBody({
		id: requestId,
		...additionalFields,
	});

	const response = await requestManagementApiRequest.call(
		this,
		'POST',
		'/request/post/load',
		body,
	);

	// Check if API call was successful
	if (response.code === 1) {
		// Process response based on selector
		const result = processResponse(response, selector);
		
		// If result is an array, return each item separately
		if (Array.isArray(result)) {
			result.forEach((item) => {
				returnData.push({
					json: item as IDataObject,
					pairedItem: index,
				});
			});
		} else {
			returnData.push({
				json: result,
				pairedItem: index,
			});
		}
	} else {
		throw new Error(`API Error: ${response.message || 'Unknown error'}`);
	}

	return returnData;
}
