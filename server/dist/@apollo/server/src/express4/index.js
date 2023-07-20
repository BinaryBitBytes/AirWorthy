import { parse as urlParse } from 'url';
import { HeaderMap } from '../utils/HeaderMap.js';
export function expressMiddleware(server, options) {
    server.assertStarted('expressMiddleware()');
    // This `any` is safe because the overload above shows that context can
    // only be left out if you're using BaseContext as your context, and {} is a
    // valid BaseContext.
    const defaultContext = async () => ({});
    const context = options?.context ?? defaultContext;
    return (req, res, next) => {
        if (!req.body) {
            // The json body-parser *always* sets req.body to {} if it's unset (even
            // if the Content-Type doesn't match), so if it isn't set, you probably
            // forgot to set up body-parser. (Note that this may change in the future
            // body-parser@2.)
            res.status(500);
            res.send('`req.body` is not set; this probably means you forgot to set up the ' +
                '`body-parser` middleware before the Apollo Server middleware.');
            return;
        }
        const headers = new HeaderMap();
        for (const [key, value] of Object.entries(req.headers)) {
            if (value !== undefined) {
                // Node/Express headers can be an array or a single value. We join
                // multi-valued headers with `, ` just like the Fetch API's `Headers`
                // does. We assume that keys are already lower-cased (as per the Node
                // docs on IncomingMessage.headers) and so we don't bother to lower-case
                // them or combine across multiple keys that would lower-case to the
                // same value.
                headers.set(key, Array.isArray(value) ? value.join(', ') : value);
            }
        }
        const httpGraphQLRequest = {
            method: req.method.toUpperCase(),
            headers,
            search: urlParse(req.url).search ?? '',
            body: req.body,
        };
        server
            .executeHTTPGraphQLRequest({
            httpGraphQLRequest,
            context: () => context({ req, res }),
        })
            .then(async (httpGraphQLResponse) => {
            for (const [key, value] of httpGraphQLResponse.headers) {
                res.setHeader(key, value);
            }
            res.statusCode = httpGraphQLResponse.status || 200;
            if (httpGraphQLResponse.body.kind === 'complete') {
                res.send(httpGraphQLResponse.body.string);
                return;
            }
            for await (const chunk of httpGraphQLResponse.body.asyncIterator) {
                res.write(chunk);
                // Express/Node doesn't define a way of saying "it's time to send this
                // data over the wire"... but the popular `compression` middleware
                // (which implements `accept-encoding: gzip` and friends) does, by
                // monkey-patching a `flush` method onto the response. So we call it
                // if it's there.
                if (typeof res.flush === 'function') {
                    res.flush();
                }
            }
            res.end();
        })
            .catch(next);
    };
}
