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
				displayName: 'Created From',
				name: 'created_from',
				type: 'number',
				default: '',
				description: 'Filter requests created from this timestamp (Unix timestamp)',
			},
			{
				displayName: 'Created To',
				name: 'created_to',
				type: 'number',
				default: '',
				description: 'Filter requests created to this timestamp (Unix timestamp)',
			},
			{
				displayName: 'Deadline From',
				name: 'deadline_from',
				type: 'number',
				default: '',
				description: 'Filter requests with deadline from this timestamp (Unix timestamp)',
			},
			{
				displayName: 'Deadline To',
				name: 'deadline_to',
				type: 'number',
				default: '',
				description: 'Filter requests with deadline to this timestamp (Unix timestamp)',
			},
			{
				displayName: 'Finish From',
				name: 'finish_from',
				type: 'number',
				default: '',
				description: 'Filter requests finished from this timestamp (Unix timestamp)',
			},
			{
				displayName: 'Finish To',
				name: 'finish_to',
				type: 'number',
				default: '',
				description: 'Filter requests finished to this timestamp (Unix timestamp)',
			},
			{
				displayName: 'Group',
				name: 'group',
				type: 'string',
				default: '',
				description: 'Filter by group ID',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Search Query',
				name: 'q',
				type: 'string',
				default: '',
				description: 'Search query to filter requests',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'string',
				default: '',
				description: 'Filter by request status',
			},
			{
				displayName: 'Updated From',
				name: 'updated_from',
				type: 'number',
				default: '',
				description: 'Filter requests updated from this timestamp (Unix timestamp)',
			},
			{
				displayName: 'Updated To',
				name: 'updated_to',
				type: 'number',
				default: '',
				description: 'Filter requests updated to this timestamp (Unix timestamp)',
			},
			{
				displayName: 'Users',
				name: 'users',
				type: 'string',
				default: '',
				description: 'Filter by usernames (comma-separated, e.g., admin,hungkien)',
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
