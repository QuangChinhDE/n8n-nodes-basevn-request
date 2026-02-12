import type { IExecuteFunctions, IHttpRequestMethods, IDataObject } from 'n8n-workflow';
export declare function requestManagementApiRequest(this: IExecuteFunctions, method: IHttpRequestMethods, endpoint: string, body?: IDataObject): Promise<IDataObject>;
export declare function requestManagementApiRequestWithPagination(this: IExecuteFunctions, endpoint: string, body?: IDataObject, propertyName?: string): Promise<IDataObject[]>;
