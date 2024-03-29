import * as http from 'http';
import * as https from 'https';
import { expectType } from 'tsd';
import { HttpProxyAgent, HttpsProxyAgent } from '../';
{
    const agent = new HttpProxyAgent({
        keepAlive: true,
        keepAliveMsecs: 1000,
        maxSockets: 256,
        maxFreeSockets: 256,
        proxy: 'http://localhost:8080'
    });
    expectType(agent);
    http.request({
        method: 'GET',
        hostname: 'localhost',
        port: 9200,
        agent
    });
}
{
    const agent = new HttpsProxyAgent({
        keepAlive: true,
        keepAliveMsecs: 1000,
        maxSockets: 256,
        maxFreeSockets: 256,
        proxy: 'http://localhost:8080'
    });
    expectType(agent);
    https.request({
        method: 'GET',
        hostname: 'localhost',
        port: 9200,
        agent
    });
}
