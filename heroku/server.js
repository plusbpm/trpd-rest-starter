require('../config/dotenv');

const path = require('path');
const fastifyStatic = require('fastify-static');
const next = require('next');

const mountApi = require('../back-end/api');
const { memory } = require('../back-end/db');
const createValidation = require('../shared/validation');
const raiseServer = require('../shared/util/raiseServer');

const mockingEnabled = process.env.CREATE_MOCK_DATA === 'true';
const dev = process.env.NODE_ENV !== 'production';

async function setup(server) {
  const validation = createValidation();
  const nextApp = next({ dev, dir: './react' });
  const nextHandle = nextApp.getRequestHandler();

  const dbAdapter = await memory.createAdapter();

  if (mockingEnabled) await dbAdapter.mocking();

  await mountApi(server, { dbAdapter, validation });

  await nextApp.prepare();

  server.setNotFoundHandler((request, reply) => {
    reply.code(404);
    reply.send('Not found');
  });

  await server.register(fastifyStatic, {
    root: path.join(__dirname, '../static'),
    prefix: '/static/',
  });

  server.get('*', async ({ raw }, { res }) => nextHandle(raw, res));
}

raiseServer(setup, 'PORT');
