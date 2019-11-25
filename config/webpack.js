require('../config/dotenv');

const { EnvironmentPlugin } = require('webpack');
const merge = require('webpack-merge');
const pick = require('lodash/pick');

const pickKeys = ['API_ROOT', 'WEBSOCKET_ROOT', 'API_DOMAIN_CLIENT'];
const publicKeys = pick(process.env, pickKeys);

module.exports = config =>
  merge(
    {
      plugins: [new EnvironmentPlugin(publicKeys)],
    },
    config,
  );
