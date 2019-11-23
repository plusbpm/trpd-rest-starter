require('../config/dotenv');

const raiseServer = require('../shared/util/raiseServer');
const setupBackendServer = require('../back-end/server');
const setupReactServer = require('../react/server');

async function setup(server) {
  await setupBackendServer(server);
  await setupReactServer(server);
}

raiseServer(setup, 'PORT');
