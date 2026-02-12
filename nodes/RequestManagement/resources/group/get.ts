import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { cleanBody } from '../../shared/utils';
import { groupIdDescription } from '../../shared/descriptions';

export const getDescription: INodeProperties[] = [
	{
		...groupIdDescription,
		displayOptions: {
			show: {
				resource: ['group'],
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

	const groupId = this.getNodeParameter('groupId', index) as string;

	const body: IDataObject = cleanBody({
		id: groupId,
	});

	const response = await requestManagementApiRequest.call(this, 'POST', '/group/get', body);
	
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
