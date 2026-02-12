import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { requestManagementApiRequest } from '../../shared/transport';
import { cleanBody, processResponse } from '../../shared/utils';

export const createCustomDescription: INodeProperties[] = [
	{
		displayName: 'Username',
		name: 'username',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['createCustom'],
			},
		},
		description: 'Username of request creator',
	},
	{
		displayName: 'Group ID',
		name: 'group_id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['createCustom'],
			},
		},
		description: 'ID of the group to create request in',
	},
	{
		displayName: 'Request Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['createCustom'],
			},
		},
		description: 'Name/title of the request',
	},
	{
		displayName: 'Direct Managers',
		name: 'direct_managers',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['createCustom'],
			},
		},
		description: 'Direct managers usernames (space-separated, e.g., "hung admin"). Required if group requires direct managers.',
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
				operation: ['createCustom'],
			},
		},
		options: [
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'Description/content of the request',
			},
			{
				displayName: 'Followers',
				name: 'followers',
				type: 'string',
				default: '',
				description: 'Follower usernames (space-separated, e.g., "trangpham haphuong")',
			},
		],
	},
	{
		displayName: 'Custom Fields',
		name: 'customFields',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Custom Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['request'],
				operation: ['createCustom'],
			},
		},
		description: 'Custom fields specific to the group (e.g., custom_so_luong_thiet_bi, custom_tong_chi_phi)',
		options: [
			{
				name: 'fields',
				displayName: 'Field',
				values: [
					{
						displayName: 'Field Name',
						name: 'name',
						type: 'string',
						default: '',
						placeholder: 'e.g., so_luong_thiet_bi, tong_chi_phi',
						description: 'Name of the custom field ("custom_" prefix will be added automatically)',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Value of the custom field',
					},
				],
			},
		],
	},
];

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const returnData: INodeExecutionData[] = [];

	// Get required fields
	const username = this.getNodeParameter('username', index) as string;
	const groupId = this.getNodeParameter('group_id', index) as string;
	const name = this.getNodeParameter('name', index) as string;
	const directManagers = this.getNodeParameter('direct_managers', index, '') as string;
	
	// Get optional fields
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;
	
	// Get custom fields
	const customFieldsData = this.getNodeParameter('customFields', index, {}) as IDataObject;
	const customFields: IDataObject = {};
	
	// Process custom fields from fixedCollection and auto-add custom_ prefix
	if (customFieldsData.fields && Array.isArray(customFieldsData.fields)) {
		for (const field of customFieldsData.fields as Array<{name: string; value: string}>) {
			if (field.name && field.value) {
				// Auto-add "custom_" prefix if not already present
				const fieldName = field.name.startsWith('custom_') ? field.name : `custom_${field.name}`;
				customFields[fieldName] = field.value;
			}
		}
	}

	// Build request body
	const body: IDataObject = cleanBody({
		username,
		group_id: groupId,
		name,
		direct_managers: directManagers,
		...additionalFields,
		...customFields,
	});

	const response = await requestManagementApiRequest.call(
		this,
		'POST',
		'/request/create',
		body,
	);

	// Check if API call was successful (code: 1 for BaseVN API)
	if (response.code === 1) {
		// Return full response with all fields
		const result = processResponse(response, '');
		returnData.push({
			json: result,
			pairedItem: index,
		});
	} else {
		// Provide more detailed error message
		const errorMsg = response.message || JSON.stringify(response) || 'Unknown error';
		throw new Error(`API Error: ${errorMsg}`);
	}

	return returnData;
}
