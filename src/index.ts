import fetch, { RequestInfo, RequestInit, Response, HeadersInit, BodyInit } from 'node-fetch';

export interface InterceptFetchInfo {
  requestId?: string | string[];
  url: RequestInfo;
  method: string;
  headers: HeadersInit | string;
  body: BodyInit | string;
}

export type RequestInitWithParentId = RequestInit & { requestId?: string | string[] };

function interceptFetch(
  beforeFetch: (interceptFetchInfo: InterceptFetchInfo) => void,
  afterFetch: (interceptFetchInfo: InterceptFetchInfo) => void,
): (url: RequestInfo, config?: RequestInitWithParentId) => Promise<Response> {
  return (url: RequestInfo, config?: RequestInitWithParentId) => {
    let requestId;
    if (config?.requestId) {
      requestId = config.requestId;
    }
    const interceptFetchInfo: InterceptFetchInfo = {
      requestId,
      url,
      method: config?.method ? config.method : 'GET',
      headers: config?.headers ? config.headers : 'none',
      body: config?.body ? config.body : 'none',
    };
    beforeFetch(interceptFetchInfo);
    function fetchFactory() {
      if (config ? Object.keys(config).length === 0 : false) {
        return fetch(url, Object.fromEntries(Object.entries(config).filter((e) => e[0] !== 'parentRequestId')));
      }
      return fetch(url);
    }
    return fetchFactory().then((res) => {
      res
        .clone()
        .json()
        .then((resJson) => {
          afterFetch({ ...interceptFetchInfo, body: resJson });
        });
      return res;
    });
  };
}
export default interceptFetch;
