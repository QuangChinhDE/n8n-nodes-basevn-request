import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { cleanBody, processResponse } from '../../shared/utils';
import { addFollowerSelectorDescription } from '../../shared/descriptions';

export const addFollowerDescription: INodeProperties[] = [
	{
		displayName: 'Request ID',
		name: 'id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['addFollower'],
			},
		},
		description: 'ID của đề xuất (mã đề xuất)',
	},
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['addFollower'],
			},
		},
		description: 'Username của người add follower (phân quyền thao tác phụ thuộc vào Advanced settings của request group)',
	},
	{
		displayName: 'Followers',
		name: 'followers',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['addFollower'],
			},
		},
		description: 'Username của (những) người được add follower. Cách nhau bằng dấu phẩy hoặc dấu cách. Giới hạn add 20 users trong 1 lần call API.',
		placeholder: 'linhdan minhchau hoặc linhdan,minhchau',
	},
	addFollowerSelectorDescription,
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	const id = this.getNodeParameter('id', index) as number;
	const username = this.getNodeParameter('username', index) as string;
	const followers = this.getNodeParameter('followers', index) as string;
	const selector = this.getNodeParameter('responseSelector', index, '') as string;

	const body: IDataObject = cleanBody({
		id,
		username,
		followers,
	});

	const response = await requestManagementApiRequest.call(
		this,
		'POST',
		'/request/add.follower',
		body,
	);

	// Handle response structure: { code: 1, message: "", data: null, ... }
	if (response.code === 1) {
		const result = processResponse(response, selector);
		returnData.push({
			json: result as IDataObject,
			pairedItem: index,
		});
	} else {
		throw new Error(`API Error: ${response.message || 'Unknown error'}. Full response: ${JSON.stringify(response)}`);
	}

	return returnData;
}
