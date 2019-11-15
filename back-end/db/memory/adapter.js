const upperFirst = require('lodash/upperFirst');

const collections = require('./collections');

class MemoryAdapter {
  constructor() {
    this.memoryCache = {};
    Object.entries(collections).forEach(([collectionName, methods]) =>
      Object.entries(methods).forEach(([methodName, method]) =>
        this.attachMethod(collectionName, methodName, method),
      ),
    );
  }

  attachMethod(collectionName, methodName, method) {
    const attachMethodName = `${collectionName}${upperFirst(methodName)}`;
    const collection = this.memoryCache[collectionName] || {};
    this.memoryCache[collectionName] = collection;
    this[attachMethodName] = async (...args) => method(collection, ...args);
  }
}

module.exports = MemoryAdapter;
