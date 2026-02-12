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
				subResource: ['request'],
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
				subResource: ['request'],
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

	const responseData = await requestManagementApiRequest.call(
		this,
		'POST',
		'/request/add.follower',
		body,
	);

	returnData.push({
		json: responseData || { success: true },
		pairedItem: index,
	});

	return returnData;
}
