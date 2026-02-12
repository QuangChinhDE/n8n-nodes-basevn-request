"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestManagementApi = void 0;
class RequestManagementApi {
    constructor() {
        this.name = 'requestManagementApi';
        this.displayName = 'Request Management API';
        this.icon = 'file:../icons/request.svg';
        this.documentationUrl = 'https://request.{domain}/extapi/v1';
        this.properties = [
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
        this.authenticate = {
            type: 'generic',
            properties: {
                body: {
                    access_token_v2: '={{$credentials.accessToken}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '=https://request.{{$credentials.domain}}/extapi/v1',
                url: '/group/list',
                method: 'POST',
            },
        };
    }
}
exports.RequestManagementApi = RequestManagementApi;
//# sourceMappingURL=RequestManagementApi.credentials.js.map