export function ApolloServerPluginLandingPageLocalDefault(options = {}) {
    const { version, __internal_apolloStudioEnv__, ...rest } = options;
    return ApolloServerPluginLandingPageDefault(version, {
        isProd: false,
        apolloStudioEnv: __internal_apolloStudioEnv__,
        ...rest,
    });
}
export function ApolloServerPluginLandingPageProductionDefault(options = {}) {
    const { version, __internal_apolloStudioEnv__, ...rest } = options;
    return ApolloServerPluginLandingPageDefault(version, {
        isProd: true,
        apolloStudioEnv: __internal_apolloStudioEnv__,
        ...rest,
    });
}
// A triple encoding! Wow! First we use JSON.stringify to turn our object into a
// string. Then we encodeURIComponent so we don't have to stress about what
// would happen if the config contained `</script>`. Finally, we JSON.stringify
// it again, which in practice just wraps it in a pair of double quotes (since
// there shouldn't be any backslashes left after encodeURIComponent). The
// consumer of this needs to decodeURIComponent and then JSON.parse; there's
// only one JSON.parse because the outermost JSON string is parsed by the JS
// parser itself.
function encodeConfig(config) {
    return JSON.stringify(encodeURIComponent(JSON.stringify(config)));
}
// This function turns an object into a string and replaces
// <, >, &, ' with their unicode chars to avoid adding html tags to
// the landing page html that might be passed from the config.
// The only place these characters can appear in the output of
// JSON.stringify is within string literals, where they can equally
// well appear \u-escaped. This specifically means that
// `</script>` won't terminate the script block early.
// (Perhaps we should have done this instead of the triple-encoding
// of encodeConfig for the main landing page.)
function getConfigStringForHtml(config) {
    return JSON.stringify(config)
        .replace('<', '\\u003c')
        .replace('>', '\\u003e')
        .replace('&', '\\u0026')
        .replace("'", '\\u0027');
}
export const getEmbeddedExplorerHTML = (version, config) => {
    const productionLandingPageConfigOrDefault = {
        displayOptions: {},
        persistExplorerState: false,
        ...(typeof config.embed === 'boolean' ? {} : config.embed),
    };
    const embeddedExplorerParams = {
        ...config,
        target: '#embeddableExplorer',
        initialState: {
            ...config,
            displayOptions: {
                ...productionLandingPageConfigOrDefault.displayOptions,
            },
        },
        persistExplorerState: productionLandingPageConfigOrDefault.persistExplorerState,
    };
    return `
<div class="fallback">
  <h1>Welcome to Apollo Server</h1>
  <p>Apollo Explorer cannot be loaded; it appears that you might be offline.</p>
</div>
<style>
  iframe {
    background-color: white;
  }
</style>
<div
style="width: 100vw; height: 100vh; position: absolute; top: 0;"
id="embeddableExplorer"
></div>
<script src="https://embeddable-explorer.cdn.apollographql.com/${version}/embeddable-explorer.umd.production.min.js"></script>
<script>
  var endpointUrl = window.location.href;
  var embeddedExplorerConfig = ${getConfigStringForHtml(embeddedExplorerParams)};
  new window.EmbeddedExplorer({
    ...embeddedExplorerConfig,
    endpointUrl,
  });
</script>
`;
};
export const getEmbeddedSandboxHTML = (version, config) => {
    return `
<div class="fallback">
  <h1>Welcome to Apollo Server</h1>
  <p>Apollo Sandbox cannot be loaded; it appears that you might be offline.</p>
</div>
<style>
  iframe {
    background-color: white;
  }
</style>
<div
style="width: 100vw; height: 100vh; position: absolute; top: 0;"
id="embeddableSandbox"
></div>
<script src="https://embeddable-sandbox.cdn.apollographql.com/${version}/embeddable-sandbox.umd.production.min.js"></script>
<script>
  var initialEndpoint = window.location.href;
  new window.EmbeddedSandbox({
    target: '#embeddableSandbox',
    initialEndpoint,
    includeCookies: ${config.includeCookies ?? 'false'},
    initialState: ${getConfigStringForHtml({
        document: config.document ?? undefined,
        variables: config.variables ?? undefined,
        headers: config.headers ?? undefined,
    })},
  });
</script>
`;
};
const getNonEmbeddedLandingPageHTML = (version, config) => {
    const encodedConfig = encodeConfig(config);
    return `
 <div class="fallback">
  <h1>Welcome to Apollo Server</h1>
  <p>The full landing page cannot be loaded; it appears that you might be offline.</p>
</div>
<script>window.landingPage = ${encodedConfig};</script>
<script src="https://apollo-server-landing-page.cdn.apollographql.com/${version}/static/js/main.js"></script>`;
};
// Helper for the two actual plugin functions.
function ApolloServerPluginLandingPageDefault(maybeVersion, config) {
    const version = maybeVersion ?? '_latest';
    return {
        __internal_installed_implicitly__: false,
        async serverWillStart() {
            return {
                async renderLandingPage() {
                    const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link
      rel="icon"
      href="https://apollo-server-landing-page.cdn.apollographql.com/${version}/assets/favicon.png"
    />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap"
      rel="stylesheet"
    />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Apollo server landing page" />
    <link
      rel="apple-touch-icon"
      href="https://apollo-server-landing-page.cdn.apollographql.com/${version}/assets/favicon.png"
    />
    <link
      rel="manifest"
      href="https://apollo-server-landing-page.cdn.apollographql.com/${version}/manifest.json"
    />
    <title>Apollo Server</title>
  </head>
  <body style="margin: 0; overflow-x: hidden; overflow-y: hidden">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="react-root">
      <style>
        .fallback {
          opacity: 0;
          animation: fadeIn 1s 1s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          padding: 1em;
        }
        @keyframes fadeIn {
          0% {opacity:0;}
          100% {opacity:1; }
        }
      </style>
    ${config.embed
                        ? 'graphRef' in config && config.graphRef
                            ? getEmbeddedExplorerHTML(version, config)
                            : getEmbeddedSandboxHTML(version, config)
                        : getNonEmbeddedLandingPageHTML(version, config)}
    </div>
  </body>
</html>
          `;
                    return { html };
                },
            };
        },
    };
}
