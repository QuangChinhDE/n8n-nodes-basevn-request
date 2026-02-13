import type {
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IDataObject,
} from 'n8n-workflow';

export class RequestManagementTrigger implements INodeType {
	usableAsTool = true;

	description: INodeTypeDescription = {
		displayName: 'BaseVN - App Request Trigger',
		name: 'requestManagementTrigger',
		icon: 'file:../../icons/request.svg',
		group: ['trigger'],
		version: 1,
		description: 'Starts the workflow when BaseVN Request events occur',
		defaults: {
			name: 'BaseVN Request Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'requestManagementApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				options: [
					{
						name: 'Request Approved',
						value: 'requestApproved',
						description: 'Trigger when a request is approved',
					},
					{
						name: 'Request Created',
						value: 'requestCreated',
						description: 'Trigger when a new request is created',
					},
					{
						name: 'Request Rejected',
						value: 'requestRejected',
						description: 'Trigger when a request is rejected',
					},
					{
						name: '[All]',
						value: '*',
						description: 'Trigger on all events',
					},
				],
				default: '*',
				description: 'The event to listen to',
			},
			{
				displayName: 'Response Selector',
				name: 'responseSelector',
				type: 'options',
				options: [
					{
						name: 'Full Payload',
						value: '',
						description: 'Return complete webhook payload',
					},
					{
						name: 'Body Only',
						value: 'body',
						description: 'Return only the body data',
					},
					{
						name: 'Request Info',
						value: 'requestInfo',
						description: 'Return simplified request information',
					},
				],
				default: 'body',
				description: 'Select which data to return from webhook',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const event = this.getNodeParameter('event') as string;
		const responseSelector = this.getNodeParameter('responseSelector', '') as string;

		// Determine event type from payload
		// Based on the status field and results array
		let detectedEvent = '';
		const status = bodyData.status as string;
		const state = bodyData.state as string;

		if (state === 'done' && status === '10') {
			detectedEvent = 'requestApproved';
		} else if (status === '-10') {
			detectedEvent = 'requestRejected';
		} else if (status === '0') {
			detectedEvent = 'requestCreated';
		}

		// Check if the detected event matches the configured event
		if (event !== '*' && event !== detectedEvent) {
			// Return empty response if event doesn't match
			return {
				workflowData: [[]],
			};
		}

		// Process response based on selector
		let returnData: IDataObject = bodyData;

		if (responseSelector === 'requestInfo') {
			// Return simplified request information
			returnData = {
				id: bodyData.id,
				name: bodyData.name,
				content: bodyData.content,
				status: bodyData.status,
				state: bodyData.state,
				event: detectedEvent,
				username: bodyData.username,
				user_id: bodyData.user_id,
				group_id: bodyData.group_id,
				group_name: bodyData.group_name,
				created_at: bodyData.since,
				updated_at: bodyData.last_update,
				deadline: bodyData.deadline,
				link: bodyData.link,
				followers: bodyData.followers,
				owners: bodyData.owners,
				// Include custom fields
				...(bodyData.custom_form ? { custom_form: bodyData.custom_form } : {}),
			};
		} else if (responseSelector === '') {
			// Return full payload including headers
			const headerData = this.getHeaderData();
			returnData = {
				headers: headerData,
				body: bodyData,
				event: detectedEvent,
			};
		} else {
			// Return body only (default)
			returnData = {
				...bodyData,
				event: detectedEvent,
			};
		}

		return {
			workflowData: [this.helpers.returnJsonArray(returnData)],
		};
	}
}
