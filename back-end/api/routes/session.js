const { session } = require('../../modules');

module.exports = async fastify => {
  fastify.get('/session', async request => {
    const sid = request && request.cookies.sid;
    if (!sid) return null;
    const sessionDoc = await session.find(fastify.dbAdapter, sid);
    return sessionDoc || {};
  });
};
