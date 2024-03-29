import { format } from 'url';
export function urlForHttpServer(httpServer) {
    const { address, port } = httpServer.address();
    // Convert IPs which mean "any address" (IPv4 or IPv6) into localhost
    // corresponding loopback ip. Note that the url field we're setting is
    // primarily for consumption by our test suite. If this heuristic is wrong for
    // your use case, explicitly specify a frontend host (in the `host` option
    // when listening).
    const hostname = address === '' || address === '::' ? 'localhost' : address;
    return format({
        protocol: 'http',
        hostname,
        port,
        pathname: '/',
    });
}
