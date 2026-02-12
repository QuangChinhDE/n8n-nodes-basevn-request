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

	const responseData = await requestManagementApiRequest.call(this, 'POST', '/group/get', body);

	returnData.push({
		json: responseData,
		pairedItem: index,
	});

	return returnData;
}
