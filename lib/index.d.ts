import { RequestInfo, RequestInit, Response, HeadersInit, BodyInit } from 'node-fetch';
export interface InterceptFetchInfo {
    requestId?: string | string[];
    url: RequestInfo;
    method: string;
    headers: HeadersInit | string;
    body: BodyInit | string;
}
export declare type RequestInitWithParentId = RequestInit & {
    requestId?: string | string[];
};
declare function interceptFetch(beforeFetch: (interceptFetchInfo: InterceptFetchInfo) => void, afterFetch: (interceptFetchInfo: InterceptFetchInfo) => void): (url: RequestInfo, config?: RequestInitWithParentId) => Promise<Response>;
export default interceptFetch;
