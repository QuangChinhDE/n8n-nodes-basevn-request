import type {
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class RequestManagementApi implements ICredentialType {
	name = 'requestManagementApi';

	displayName = 'BaseVN - App Request API';

	icon: Icon = 'file:../icons/request.svg';

	documentationUrl = 'https://request.{domain}/extapi/v1';

	properties: INodeProperties[] = [
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: '',
			placeholder: 'example.com',
			description: 'Your domain (e.g., example.com)',
			required: true,
		},
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Access token from Base Account (v2)',
			required: true,
		},
	];

	// Note: authenticate is handled manually in transport.ts
	// to ensure proper form-urlencoded format

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://request.{{$credentials.domain}}/extapi/v1',
			url: '/group/list',
			method: 'POST',
			body: {
				access_token_v2: '={{$credentials.accessToken}}',
				page: 0,
			},
		},
	};
}
