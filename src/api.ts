/**
 * Create a wrapper for making HTTP requests.
 */
export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

/**
 * Create an HTTP request with the specified method.
 *
 * @param {string} method - The HTTP method (e.g., 'GET', 'POST').
 * @returns {Function} A function for making the HTTP request.
 */
function request(method: string) {
    return (url: string, body?: any) => {
        const requestOptions = {
            method,
            headers: {}
        };
        if (body) {
            requestOptions.headers['Content-Type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(`api/${url}`, requestOptions).then(handleResponse);
    };
}


/**
 * Handle the HTTP response.
 *
 * @param {Response} response - The HTTP response.
 * @returns {Promise<any>} A Promise that resolves with the response data or rejects with an error.
 */
function handleResponse(response: Response) {
    return response.text().then(text => {
        if (!response.ok) {
            const error = (text && JSON.parse(text)) || response.statusText;
            return Promise.reject(error);
        }
        return text ? JSON.parse(text) : null;
    });
}
