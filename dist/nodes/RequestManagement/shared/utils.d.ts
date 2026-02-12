import type { IDataObject } from 'n8n-workflow';
export declare function snakeToCamel(obj: IDataObject): IDataObject;
export declare function cleanBody(body: IDataObject): IDataObject;
export declare function handleApiError(error: Error & {
    response?: {
        status: number;
        statusText?: string;
    };
}): string;
export declare function processResponse(response: IDataObject, selector?: string): IDataObject;
