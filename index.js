const { GoogleAuth } = require('google-auth-library');
const { headers } = require('@haensl/http');

/**
 * Get authorization to call a URL.
 *
 * @param {string|URL} url - The URL you want to call.
 *
 * @returns {Promise} - Authorization header value to authorize the request.
 */
const getAuthorization = async (url) => {
  const _url = (() => {
    if (!(url instanceof URL)) {
      return new URL(url);
    }

    return url;
  })();

  const audience = ((url) => {
    if (/app\.run/.test(url) || /run\.app$/.test(url)) {
      // cloud run audience -> origin is audience
      return url.origin;
    } else if (/cloudfunctions\.net/.test(url)) {
      // cloud functions target -> full path is audience
      return `${url.origin}${url.pathname}`;
    }

    return url;
  })(_url);

  const auth = new GoogleAuth();
  const authClient = await auth.getIdTokenClient(audience);
  const authHeaders = await authClient.getRequestHeaders(_url);

  return authHeaders[headers.authorization];
};

const service = {
  getAuthorization
};

module.exports = service;
