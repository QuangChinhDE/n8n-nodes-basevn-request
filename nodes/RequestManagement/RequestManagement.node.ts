import {
	NodeConnectionTypes,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';

import * as group from './resources/group';
import * as request from './resources/request';

export class RequestManagement implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BaseVN - App Request',
		name: 'requestManagement',
		icon: 'file:../../icons/request.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with BaseVN - App Request',
		defaults: {
			name: 'BaseVN - App Request',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'requestManagementApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Request',
						value: 'request',
					},
				],
				default: 'group',
			},
			...group.description,
			...request.description,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: INodeExecutionData[] = [];

				if (resource === 'group') {
					const operation = this.getNodeParameter('operation', i) as string;
					
					if (operation === 'get') {
						responseData = await group.get.execute.call(this, i);
					} else if (operation === 'getAll') {
						responseData = await group.getAll.execute.call(this, i);
					}
				} else if (resource === 'request') {
					const operation = this.getNodeParameter('operation', i) as string;
					
					if (operation === 'get') {
						responseData = await request.get.execute.call(this, i);
					} else if (operation === 'getAll') {
						responseData = await request.getAll.execute.call(this, i);
					} else if (operation === 'createCustom') {
						responseData = await request.createCustom.execute.call(this, i);

					} else if (operation === 'getWithCustomTable') {
						responseData = await request.getWithCustomTable.execute.call(this, i);
					} else if (operation === 'addFollower') {
						responseData = await request.addFollower.execute.call(this, i);
					} else if (operation === 'getPosts') {
						responseData = await request.getPosts.execute.call(this, i);
					} else if (operation === 'getComments') {
						responseData = await request.getComments.execute.call(this, i);
					}
				}

				returnData.push(...responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: error.message },
						pairedItem: i,
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
