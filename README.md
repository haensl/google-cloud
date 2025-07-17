# @haensl/google-cloud

Useful utitlities for working in Google Cloud.

[![NPM](https://nodei.co/npm/@haensl%2Fgoogle-cloud.png?downloads=true)](https://nodei.co/npm/@haensl%2Fgoogle-cloud/)

[![npm version](https://badge.fury.io/js/@haensl%2Fgoogle-cloud.svg)](http://badge.fury.io/js/@haensl%2Fgoogle-cloud)

[![CircleCI](https://circleci.com/gh/haensl/google-cloud.svg?style=svg)](https://circleci.com/gh/haensl/google-cloud)

## Installation

```bash
# via npm
npm i --save @haensl/google-cloud
```

## Usage

### `getAuthorization`: `async (url) => string` <a name="api/getAuthorization"></a>

Get authorization to call a URL. This is useful to authorize requests between services within Google Cloud.

#### Parameters

`url`: `string|URL`

The URL you want to call.

#### Returns

The Authorization header for the request to the given URL.

#### Example: Authorizing a request

```javascript
const { getAuthorization } = require('@haensl/google-cloud');
const fetch = require('node-fetch');

const callOtherService = async () => {
    // ...
    const otherService = new URL('https://myservice-1234567890.region.run.app');
    const authorization = await getAuthorization(otherService);

    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': authorization
      }
    };

    const response = await fetch(otherService, requestOptions);

    // ...
};
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
