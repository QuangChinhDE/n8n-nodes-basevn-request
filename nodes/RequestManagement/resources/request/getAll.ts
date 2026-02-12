import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { pageDescription } from '../../shared/descriptions';
import { cleanBody } from '../../shared/utils';

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
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const page = this.getNodeParameter('page', index, 0) as number;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const body: IDataObject = cleanBody({ 
		page,
		...additionalFields,
	});
	
	const response = await requestManagementApiRequest.call(this, 'POST', '/request/list', body);
	
	// Handle response structure: { code: 1, message: "", data: {...} }
	// Need to test what field contains the requests array
	if (response.code === 1) {
		// Check different possible response fields
		const responseData = response.requests || response.data || response;
		
		if (Array.isArray(responseData)) {
			responseData.forEach((item) => {
				returnData.push({
					json: item,
					pairedItem: index,
				});
			});
		} else if (responseData && typeof responseData === 'object') {
			returnData.push({
				json: responseData as IDataObject,
				pairedItem: index,
			});
		}
	} else {
		throw new Error(`API Error: ${response.message || 'Unknown error'}`);
	}

	return returnData;
}
