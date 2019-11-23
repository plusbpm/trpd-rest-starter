require('../config/dotenv');
const next = require('next');

const raiseServer = require('../shared/util/raiseServer');

const dev = process.env.NODE_ENV !== 'production';

async function setup(server) {
  const nextApp = next({ dev, dir: './react' });
  const nextHandle = nextApp.getRequestHandler();
  await nextApp.prepare();
  server.get('*', async ({ raw }, { res }) => nextHandle(raw, res));
}

if (require.main === module) raiseServer(setup, 'PORT_REACT');

module.exports = setup;
