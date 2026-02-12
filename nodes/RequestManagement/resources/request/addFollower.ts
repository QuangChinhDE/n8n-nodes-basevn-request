import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { cleanBody } from '../../shared/utils';
import { requestIdDescription } from '../../shared/descriptions';

export const addFollowerDescription: INodeProperties[] = [
	{
		...requestIdDescription,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['addFollower'],
			},
		},
	},
	{
		displayName: 'Follower ID',
		name: 'followerId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['addFollower'],
			},
		},
		description: 'The ID of the user to add as follower',
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	const requestId = this.getNodeParameter('requestId', index) as string;
	const followerId = this.getNodeParameter('followerId', index) as string;

	const body: IDataObject = cleanBody({
		request_id: requestId,
		follower_id: followerId,
	});

	const response = await requestManagementApiRequest.call(
		this,
		'POST',
		'/request/add.follower',
		body,
	);

	// Handle response structure: { code: 200, message: "Success", data: {...} }
	if (response.code === 200) {
		returnData.push({
			json: (response.data || response) as IDataObject,
			pairedItem: index,
		});
	} else {
		throw new Error(`API Error: ${response.message || 'Unknown error'}`);
	}

	return returnData;
}
