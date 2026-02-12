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
