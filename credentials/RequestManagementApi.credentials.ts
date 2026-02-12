import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class RequestManagementApi implements ICredentialType {
	name = 'requestManagementApi';

	displayName = 'Request Management API';

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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			body: {
				access_token_v2: '={{$credentials.accessToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '=https://request.{{$credentials.domain}}/extapi/v1',
			url: '/group/list',
			method: 'POST',
		},
	};
}
