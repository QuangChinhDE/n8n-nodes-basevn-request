import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { pageDescription, requestListSelectorDescription } from '../../shared/descriptions';
import { cleanBody, processResponse } from '../../shared/utils';

export const getAllDescription: INodeProperties[] = [
	{
		...pageDescription,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['getAll'],
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
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'string',
				default: '',
				description: 'Filter condition for requests',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Filter by request status',
			},
		],
	},
	{
		...requestListSelectorDescription,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['getAll'],
			},
		},
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const page = this.getNodeParameter('page', index, 0) as number;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
	const selector = this.getNodeParameter('responseSelector', index, '') as string;

	const body: IDataObject = cleanBody({ 
		page,
		...additionalFields,
	});
	
	const response = await requestManagementApiRequest.call(this, 'POST', '/request/list', body);
	
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
