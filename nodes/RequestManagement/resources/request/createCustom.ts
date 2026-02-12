import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { cleanBody } from '../../shared/utils';
import { groupIdDescription } from '../../shared/descriptions';

export const createCustomDescription: INodeProperties[] = [
	{
		...groupIdDescription,
		displayOptions: {
			show: {
				resource: ['request'],
				subResource: ['request'],
				operation: ['createCustom'],
			},
		},
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['request'],
				subResource: ['request'],
				operation: ['createCustom'],
			},
		},
		description: 'The title of the request',
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
				subResource: ['request'],
				operation: ['createCustom'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'The description of the request',
			},
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'string',
				default: '',
				description: 'Custom fields as JSON string',
			},
		],
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	const groupId = this.getNodeParameter('groupId', index) as string;
	const title = this.getNodeParameter('title', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const body: IDataObject = cleanBody({
		group_id: groupId,
		title,
		...additionalFields,
	});

	const responseData = await requestManagementApiRequest.call(
		this,
		'POST',
		'/request/create',
		body,
	);

	returnData.push({
		json: responseData || { success: true },
		pairedItem: index,
	});

	return returnData;
}
