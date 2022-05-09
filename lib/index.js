"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
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
                return (0, node_fetch_1.default)(url, Object.fromEntries(Object.entries(config).filter((e) => e[0] !== 'parentRequestId')));
            }
            return (0, node_fetch_1.default)(url);
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
exports.default = interceptFetch;
