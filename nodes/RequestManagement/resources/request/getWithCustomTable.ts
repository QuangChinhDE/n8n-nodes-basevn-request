import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { cleanBody } from '../../shared/utils';
import { requestIdDescription } from '../../shared/descriptions';

export const getWithCustomTableDescription: INodeProperties[] = [
	{
		...requestIdDescription,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['getWithCustomTable'],
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

	const body: IDataObject = cleanBody({
		id: requestId,
	});

	const response = await requestManagementApiRequest.call(
		this,
		'POST',
		'/request/custom.table',
		body,
	);

	// Handle response structure: { code: 1, message: "", data: null, group: {...} }
	// code: 1 means success in BaseVN API
	if (response.code === 1 && response.group) {
		returnData.push({
			json: response.group as IDataObject,
			pairedItem: index,
		});
	} else {
		throw new Error(`API Error: ${response.message || 'Unknown error'}`);
	}

	return returnData;
}
