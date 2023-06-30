import express from 'express';
import corsMiddleware from 'cors';
import { json } from 'body-parser';
import { ApolloServerBase, runHttpQuery, convertNodeHttpToRequest, isHttpQueryError, } from 'apollo-server-core';
import accepts from 'accepts';
export class ApolloServer extends ApolloServerBase {
    // This translates the arguments from the middleware into graphQL options It
    // provides typings for the integration specific behavior, ideally this would
    // be propagated with a generic to the super class
    async createGraphQLServerOptions(req, res) {
        const contextParams = { req, res };
        return super.graphQLServerOptions(contextParams);
    }
    applyMiddleware({ app, ...rest }) {
        // getMiddleware calls this too, but we want the right method name in the error
        this.assertStarted('applyMiddleware');
        app.use(this.getMiddleware(rest));
    }
    // TODO: While `express` is not Promise-aware, this should become `async` in
    // a major release in order to align the API with other integrations (e.g.
    // Hapi) which must be `async`.
    getMiddleware({ path, cors, bodyParserConfig, disableHealthCheck, onHealthCheck, __internal_healthCheckPath, } = {}) {
        if (!path)
            path = '/graphql';
        this.assertStarted('getMiddleware');
        // Note that even though we use Express's router here, we still manage to be
        // Connect-compatible because express.Router just implements the same
        // middleware interface that Connect and Express share!
        const router = express.Router();
        if (!disableHealthCheck && __internal_healthCheckPath !== null) {
            router.use(__internal_healthCheckPath ?? '/.well-known/apollo/server-health', (req, res) => {
                // Response follows https://tools.ietf.org/html/draft-inadarei-api-health-check-01
                res.type('application/health+json');
                if (onHealthCheck) {
                    onHealthCheck(req)
                        .then(() => {
                        res.json({ status: 'pass' });
                    })
                        .catch(() => {
                        res.status(503).json({ status: 'fail' });
                    });
                }
                else {
                    res.json({ status: 'pass' });
                }
            });
        }
        // XXX multiple paths?
        this.graphqlPath = path;
        // Note that we don't just pass all of these handlers to a single app.use call
        // for 'connect' compatibility.
        if (cors === true) {
            router.use(path, corsMiddleware());
        }
        else if (cors !== false) {
            router.use(path, corsMiddleware(cors));
        }
        if (bodyParserConfig === true) {
            router.use(path, json());
        }
        else if (bodyParserConfig !== false) {
            router.use(path, json(bodyParserConfig));
        }
        const landingPage = this.getLandingPage();
        router.use(path, (req, res, next) => {
            if (landingPage && prefersHtml(req)) {
                res.setHeader('Content-Type', 'text/html');
                res.write(landingPage.html);
                res.end();
                return;
            }
            if (!req.body) {
                // The json body-parser *always* sets req.body to {} if it's unset (even
                // if the Content-Type doesn't match), so if it isn't set, you probably
                // forgot to set up body-parser.
                res.status(500);
                if (bodyParserConfig === false) {
                    res.send('`res.body` is not set; you passed `bodyParserConfig: false`, ' +
                        'but you still need to use `body-parser` middleware yourself.');
                }
                else {
                    res.send('`res.body` is not set even though Apollo Server installed ' +
                        "`body-parser` middleware; this shouldn't happen!");
                }
                return;
            }
            runHttpQuery([], {
                method: req.method,
                options: () => this.createGraphQLServerOptions(req, res),
                query: req.method === 'POST' ? req.body : req.query,
                request: convertNodeHttpToRequest(req),
            }, this.csrfPreventionRequestHeaders).then(({ graphqlResponse, responseInit }) => {
                if (responseInit.headers) {
                    for (const [name, value] of Object.entries(responseInit.headers)) {
                        res.setHeader(name, value);
                    }
                }
                res.statusCode = responseInit.status || 200;
                // Using `.send` is a best practice for Express, but we also just use
                // `.end` for compatibility with `connect`.
                if (typeof res.send === 'function') {
                    res.send(graphqlResponse);
                }
                else {
                    res.end(graphqlResponse);
                }
            }, (error) => {
                if (!isHttpQueryError(error)) {
                    return next(error);
                }
                if (error.headers) {
                    for (const [name, value] of Object.entries(error.headers)) {
                        res.setHeader(name, value);
                    }
                }
                res.statusCode = error.statusCode;
                if (typeof res.send === 'function') {
                    // Using `.send` is a best practice for Express, but we also just use
                    // `.end` for compatibility with `connect`.
                    res.send(error.message);
                }
                else {
                    res.end(error.message);
                }
            });
        });
        return router;
    }
}
function prefersHtml(req) {
    if (req.method !== 'GET') {
        return false;
    }
    const accept = accepts(req);
    const types = accept.types();
    return (types.find((x) => x === 'text/html' || x === 'application/json') ===
        'text/html');
}
