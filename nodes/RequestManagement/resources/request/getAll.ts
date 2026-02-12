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
				resource: ['request'],
				operation: ['getAll'],
			},
		},
	},
	{
		...pageDescription,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['getAll'],
				returnAll: [false],
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
	const returnAll = this.getNodeParameter('returnAll', index, false) as boolean;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	let responseData;

	const bodyBase: IDataObject = {
		...additionalFields,
	};

	if (returnAll) {
		// Fetch all pages
		responseData = await requestManagementApiRequestWithPagination.call(
			this,
			'/request/list',
			bodyBase,
			'data',
		);
	} else {
		// Fetch single page
		const page = this.getNodeParameter('page', index, 0) as number;
		const body: IDataObject = cleanBody({ ...bodyBase, page });
		const response = await requestManagementApiRequest.call(this, 'POST', '/request/list', body);
		responseData = response.data || [];
	}

	// Process response data
	if (Array.isArray(responseData)) {
		responseData.forEach((item) => {
			returnData.push({
				json: item,
				pairedItem: index,
			});
		});
	}

	return returnData;
}
