import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import {
	requestManagementApiRequest,
	requestManagementApiRequestWithPagination,
} from '../../shared/transport';
import { returnAllDescription, pageDescription } from '../../shared/descriptions';
import { cleanBody } from '../../shared/utils';

export const getAllDescription: INodeProperties[] = [
	{
		...returnAllDescription,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getAll'],
			},
		},
	},
	{
		...pageDescription,
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];
	const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;

	let responseData;

	if (returnAll) {
		// Fetch all pages
		responseData = await requestManagementApiRequestWithPagination.call(
			this,
			'/group/list',
			{},
			'groups',
		);
	} else {
		// Fetch single page
		const page = this.getNodeParameter('page', index, 0) as number;
		const body: IDataObject = cleanBody({ page });
		const response = await requestManagementApiRequest.call(this, 'POST', '/group/list', body);
		
		// Handle response structure: { code: 1, message: "", data: null, groups: [...] }
		// code: 1 means success in BaseVN API
		if (response.code === 1 && response.groups) {
			responseData = response.groups;
		} else {
			throw new Error(`API Error: ${response.message || 'Unknown error'}`);
		}
	}

	// Process response data
	if (Array.isArray(responseData)) {
		responseData.forEach((item) => {
			returnData.push({
				json: item,
				pairedItem: index,
			});
		});
	} else {
		// If response is not an array, return it as a single item
		returnData.push({
			json: responseData as IDataObject,
			pairedItem: index,
		});
	}

	return returnData;
}
