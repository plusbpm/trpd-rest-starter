require('../config/dotenv');

const path = require('path');
const fastifyStatic = require('fastify-static');
const fastifyProxy = require('fastify-http-proxy');
const raiseServer = require('../shared/util/raiseServer');

const mountApi = require('./api');
const { memory } = require('./db');
const createValidation = require('../shared/validation');

const mockingEnabled = process.env.CREATE_MOCK_DATA === 'true';
const serveStatic = process.env.BACKEND_SERVE_STATIC || '';
const upstreamHost = process.env.BACKEND_UPSTREAM || '';

async function setup(server) {
  const validation = createValidation();
  const dbAdapter = await memory.createAdapter();
  if (mockingEnabled) await dbAdapter.mocking();

  await mountApi(server, { dbAdapter, validation });

  server.setNotFoundHandler((request, reply) => {
    reply.code(404);
    reply.send('Not found');
  });

  if (serveStatic !== '')
    await server.register(fastifyStatic, {
      root: path.join(__dirname, '../static'),
      prefix: '/static/',
    });

  if (upstreamHost !== '')
    server.register(fastifyProxy, {
      upstream: upstreamHost,
    });
}

if (require.main === module) raiseServer(setup, 'PORT_BACKEND');

module.exports = setup;
