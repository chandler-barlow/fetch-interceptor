# Fetch Interceptor

_Written in Typescript_

Fetch Interceptor is a small Typescript package that allows for the interception of requests made via Node-Fetch.

# Usage

To install

```bash
$ npm i @americanairlines/fetch-interceptor
```

Create your interceptor

```javascript
const interceptor = require("@americanairlines/fetch-interceptor");

function beforeFetch(requestInfo) {
  let { requestId, method, url, params, headers, body } = requestInfo;
  console.log("RequestId " + requestId);
  console.log("Request Type " + method);
  console.log("Request Url " + url);
  console.log("Request Params " + params);
  console.log("Request Headers " + headers);
  console.log("Request Body" + body);
}

function afterFetch(requestInfo) {
  let { requestId, method, url, params, headers, body } = requestInfo;
  console.log("RequestId " + requestId);
  console.log("Request Type " + method);
  console.log("Request Url " + url);
  console.log("Request Params " + params);
  console.log("Request Headers " + headers);
  console.log("Request Body" + body);
}

module.exports.default = interceptor(beforeController, afterController);
```

Using the interceptor.</br>
It's important to import and use the interceptor you created in the same way you would use fetch. This just intercepts fetch and you can pass all the same arguments you normally would to fetch.

```javascript
const fetch = require("../path/to/interceptor");

async function foo() {
  let bar = await fetch("https://some-site.com");
}

foo();
```

# API

### Tracing

The trace ids are of the format `X-Trace-Id`. The instanceId is generated when the server starts, and the requestId is generated when the route is called. This allows for tracing calls to specific routes as well as tracing requests to a specific instance of a service.

### requestInfo

This is the logging object with the request info that the handler functions have access to. </br>

#### Note

This package was made to work with `@americanairlines/controller-interceptor`. Using this package in combonation with `@americanairlines/controller-interceptor` provides you with the ability to trace connections between services with a trace id. This trace id does not have to come from `@americanairlines/controller-interceptor` but it works well with it.

```javascript
RequestInfo = {
  requestId: string; // The trace Id of the request
  method: string; // The http method of the request
  url: string; // The url that the request was made to
  params: Object; // The params passed to the request
  headers: Object; // The header object of the incoming/outgoing request
  body: Body; // The body of the incoming/outgoing request
}
```

### beforeFetch/afterFetch

These functions are not passed the actual body or headers objects, just copies of them. You are **not** able to mutate these fields in the handler functions.

# Author

[Chandler Barlow](https://github.com/chandler-barlow)

# Collaborators

[Steven Paulino](https://github.com/Stevenpaulino1)

# License

[MIT](https://github.com/chandler-barlow/fetch-interceptor/blob/main/LICENSE)
