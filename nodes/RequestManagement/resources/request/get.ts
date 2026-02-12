import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { cleanBody, processResponse } from '../../shared/utils';
import { requestIdDescription, requestGetSelectorDescription } from '../../shared/descriptions';

export const getDescription: INodeProperties[] = [
	{
		...requestIdDescription,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['get'],
			},
		},
	},
	{
		...requestGetSelectorDescription,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['get'],
			},
		},
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	const requestId = this.getNodeParameter('requestId', index) as string;
	const selector = this.getNodeParameter('responseSelector', index, '') as string;

	const body: IDataObject = cleanBody({
		id: requestId,
	});

	const response = await requestManagementApiRequest.call(this, 'POST', '/request/get', body);
	
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
