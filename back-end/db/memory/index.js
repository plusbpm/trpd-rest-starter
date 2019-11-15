const MemoryAdapter = require('./adapter');

const createAdapter = async () => {
  const adapter = new MemoryAdapter();
  return adapter;
};

module.exports = {
  createAdapter,
};
