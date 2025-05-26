/**
 * Request Service
 *
 * This service is responsible for making HTTP requests
 * to the server. It is a facade for the Fetch API.
 */

/**
 * Make a request to the server.
 *
 * @param {string} url The URL to send the request to.
 * @param {string} method The HTTP method to use (GET, POST, PUT, DELETE).
 * @param {Object} data The data to send in the request body.
 * @returns {Promise<Object>} The parsed JSON response from the server.
 */
export async function request(url, method = 'GET', data = '', headers = {}) {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body:
      method === 'GET' || method === 'HEAD' ? undefined : JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }

  const responseData = await response.json();

  if (responseData.error) {
    throw new Error(`${response.status} error: ${responseData.error}`);
  }

  return responseData;
}

export function getRequest(url, data = '', headers = {}) {
  return request(url, 'GET', data, headers);
}

export function postRequest(url, data = '', headers = {}) {
  return request(url, 'POST', data, headers);
}

export function patchRequest(url, data = '', headers = {}) {
  return request(url, 'PATCH', data, headers);
}

export function deleteRequest(url, data = '', headers = {}) {
  return request(url, 'DELETE', data, headers);
}
