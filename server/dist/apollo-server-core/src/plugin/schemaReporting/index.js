import os from 'os';
import { v4 as uuidv4 } from 'uuid';
import { printSchema, validateSchema, buildSchema } from 'graphql';
import { SchemaReporter } from './schemaReporter';
import createSHA from '../../utils/createSHA';
import { schemaIsFederated } from '../schemaIsFederated';
export function ApolloServerPluginSchemaReporting({ initialDelayMaxMs, overrideReportedSchema, endpointUrl, fetcher, } = Object.create(null)) {
    const bootId = uuidv4();
    return {
        __internal_plugin_id__() {
            return 'SchemaReporting';
        },
        async serverWillStart({ apollo, schema, logger }) {
            const { key, graphRef } = apollo;
            if (!key) {
                throw Error('To use ApolloServerPluginSchemaReporting, you must provide an Apollo API ' +
                    'key, via the APOLLO_KEY environment variable or via `new ApolloServer({apollo: {key})`');
            }
            if (!graphRef) {
                // This error is a bit imprecise as you can also specify ID and variant separately,
                // or rely on API-key parsing (before AS3), but this is "best practices".
                throw Error('To use ApolloServerPluginSchemaReporting, you must provide your graph ref (eg, ' +
                    "'my-graph-id@my-graph-variant'). Try setting the APOLLO_GRAPH_REF environment " +
                    'variable or passing `new ApolloServer({apollo: {graphRef}})`.');
            }
            // Ensure a provided override schema can be parsed and validated
            if (overrideReportedSchema) {
                try {
                    const validationErrors = validateSchema(buildSchema(overrideReportedSchema, { noLocation: true }));
                    if (validationErrors.length) {
                        throw new Error(validationErrors.map((error) => error.message).join('\n'));
                    }
                }
                catch (err) {
                    throw new Error('The schema provided to overrideReportedSchema failed to parse or ' +
                        `validate: ${err.message}`);
                }
            }
            if (schemaIsFederated(schema)) {
                throw Error([
                    'Schema reporting is not yet compatible with federated services.',
                    "If you're interested in using schema reporting with federated",
                    'services, please contact Apollo support. To set up managed federation, see',
                    'https://go.apollo.dev/s/managed-federation',
                ].join(' '));
            }
            if (endpointUrl !== undefined) {
                logger.info(`Apollo schema reporting: schema reporting URL override: ${endpointUrl}`);
            }
            const baseSchemaReport = {
                bootId,
                graphRef,
                // The infra environment in which this edge server is running, e.g. localhost, Kubernetes
                // Length must be <= 256 characters.
                platform: process.env.APOLLO_SERVER_PLATFORM || 'local',
                runtimeVersion: `node ${process.version}`,
                // An identifier used to distinguish the version of the server code such as git or docker sha.
                // Length must be <= 256 characters
                userVersion: process.env.APOLLO_SERVER_USER_VERSION,
                // "An identifier for the server instance. Length must be <= 256 characters.
                serverId: process.env.APOLLO_SERVER_ID || process.env.HOSTNAME || os.hostname(),
                libraryVersion: `apollo-server-core@${require('../../../package.json').version}`,
            };
            let currentSchemaReporter;
            return {
                schemaDidLoadOrUpdate({ apiSchema, coreSupergraphSdl }) {
                    if (overrideReportedSchema !== undefined) {
                        if (currentSchemaReporter) {
                            // When the schema to report has been overridden, there is no need
                            // to create a new schema reporter.
                            return;
                        }
                        else {
                            logger.info('Apollo schema reporting: schema to report has been overridden');
                        }
                    }
                    const coreSchema = overrideReportedSchema ??
                        coreSupergraphSdl ??
                        printSchema(apiSchema);
                    const coreSchemaHash = computeCoreSchemaHash(coreSchema);
                    const schemaReport = {
                        ...baseSchemaReport,
                        coreSchemaHash,
                    };
                    currentSchemaReporter?.stop();
                    currentSchemaReporter = new SchemaReporter({
                        schemaReport,
                        coreSchema,
                        apiKey: key,
                        endpointUrl,
                        logger,
                        // Jitter the startup between 0 and 10 seconds
                        initialReportingDelayInMs: Math.floor(Math.random() * (initialDelayMaxMs ?? 10000)),
                        fallbackReportingDelayInMs: 20000,
                        fetcher,
                    });
                    currentSchemaReporter.start();
                    logger.info('Apollo schema reporting: reporting a new schema to Studio! See your graph at ' +
                        `https://studio.apollographql.com/graph/${encodeURI(graphRef)}/ with server info ${JSON.stringify(schemaReport)}`);
                },
                async serverWillStop() {
                    currentSchemaReporter?.stop();
                },
            };
        },
    };
}
export function computeCoreSchemaHash(schema) {
    return createSHA('sha256').update(schema).digest('hex');
}
