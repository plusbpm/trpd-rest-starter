const { session } = require('../../modules');

const sessionRoutes = require('./session');

module.exports = async fastify => {
  fastify.addHook('preHandler', async request => {
    const sessionId = request.cookies[session.cookieName];
    if (!sessionId) return;
    await session.touch(fastify.dbAdapter, sessionId);
  });

  await fastify.register(sessionRoutes);

  fastify.all('/*', async (request, reply) => {
    reply.code(404);
    return 'Unknown api endpoint.';
  });
};
