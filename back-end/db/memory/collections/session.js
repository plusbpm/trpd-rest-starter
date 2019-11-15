const set = require('lodash/set');

async function insert(collection, sessionId, data) {
  Object.assign(collection, {
    [sessionId]: {
      _id: sessionId,
      ...data,
      created: new Date(),
    },
  });
}

async function remove(collection, sessionId) {
  Object.assign(collection, { [sessionId]: null });
}

async function findById(collection, sessionId) {
  return collection[sessionId] || null;
}

async function touch(collection, sessionId) {
  set(collection, [sessionId, 'created'], new Date());
}

module.exports = {
  insert,
  remove,
  findById,
  touch,
};
