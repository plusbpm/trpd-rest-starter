const { session } = require('../../modules');

module.exports = async fastify => {
  fastify.get('/session', async request => {
    const sid = request && request.cookies.sid;
    if (!sid) return {};
    const sessionDoc = await session.find(fastify.dbAdapter, sid);
    return sessionDoc || {};
  });
};
