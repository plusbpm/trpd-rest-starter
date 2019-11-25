import RestClient from './RestClient';

let restClientSingltone;

const apiRoot = process.env.API_ROOT;
const apiDomain = process.env.API_DOMAIN_SERVER || process.env.API_DOMAIN_CLIENT;

function createClient(options) {
  const nextOptions = { ...options, apiRoot: `${apiDomain}${apiRoot}` };

  if (!process.browser) {
    return new RestClient(nextOptions);
  }

  if (!restClientSingltone) {
    restClientSingltone = new RestClient(nextOptions);
  }

  return restClientSingltone;
}

export default createClient;
