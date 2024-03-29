import { Request, Headers } from 'apollo-server-env';
export function convertNodeHttpToRequest(req) {
    const headers = new Headers();
    Object.keys(req.headers).forEach((key) => {
        const values = req.headers[key];
        if (Array.isArray(values)) {
            values.forEach((value) => headers.append(key, value));
        }
        else {
            headers.append(key, values);
        }
    });
    return new Request(req.url, {
        headers,
        method: req.method,
    });
}
