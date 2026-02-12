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
				subResource: ['request'],
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

	const responseData = await requestManagementApiRequest.call(
		this,
		'POST',
		'/request/custom.table',
		body,
	);

	returnData.push({
		json: responseData,
		pairedItem: index,
	});

	return returnData;
}
