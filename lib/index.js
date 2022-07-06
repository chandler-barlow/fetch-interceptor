import fetch from 'node-fetch';
function interceptFetch(beforeFetch, afterFetch) {
    return (url, config) => {
        let requestId;
        if (config === null || config === void 0 ? void 0 : config.requestId) {
            requestId = config.requestId;
        }
        const interceptFetchInfo = {
            requestId,
            url,
            method: (config === null || config === void 0 ? void 0 : config.method) ? config.method : 'GET',
            headers: (config === null || config === void 0 ? void 0 : config.headers) ? config.headers : 'none',
            body: (config === null || config === void 0 ? void 0 : config.body) ? config.body : 'none',
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
                afterFetch(Object.assign(Object.assign({}, interceptFetchInfo), { body: resJson }));
            });
            return res;
        });
    };
}
export default interceptFetch;
