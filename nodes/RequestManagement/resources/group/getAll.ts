import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { pageDescription, groupListSelectorDescription } from '../../shared/descriptions';
import { cleanBody, processResponse } from '../../shared/utils';

export const getAllDescription: INodeProperties[] = [
	{
		...pageDescription,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getAll'],
			},
		},
	},
	{
		...groupListSelectorDescription,
		displayOptions: {
			show: {
				resource: ['group'],
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
	const selector = this.getNodeParameter('responseSelector', index, '') as string;
	
	const body: IDataObject = cleanBody({ page });
	const response = await requestManagementApiRequest.call(this, 'POST', '/group/list', body);
	
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
			// Return as single item
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
