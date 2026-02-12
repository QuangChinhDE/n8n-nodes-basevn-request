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

	// Handle response structure: { code: 200, message: "Success", data: {...} }
	if (response.code === 200 && response.data) {
		returnData.push({
			json: response.data as IDataObject,
			pairedItem: index,
		});
	} else {
		throw new Error(`API Error: ${response.message || 'Unknown error'}`);
	}

	return returnData;
}
