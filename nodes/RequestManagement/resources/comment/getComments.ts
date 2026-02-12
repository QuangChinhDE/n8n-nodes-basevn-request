import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { cleanBody, processResponse } from '../../shared/utils';
import { postIdDescription, commentLoadSelectorDescription } from '../../shared/descriptions';

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
	{
		...commentLoadSelectorDescription,		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['getComments'],
			},		},
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	const postHid = this.getNodeParameter('postHid', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
	const selector = this.getNodeParameter('responseSelector', index, '') as string;

	const body: IDataObject = cleanBody({
		hid: postHid,
		...additionalFields,
	});

	const response = await requestManagementApiRequest.call(
		this,
		'POST',
		'/request/comment/load',
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
