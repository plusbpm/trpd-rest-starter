const log = (...args) => {
  // eslint-disable-next-line no-console
  console.info(...args);
};

module.exports = async adapter => {
  // eslint-disable-next-line no-unused-vars
  const { db } = adapter;

  // eslint-disable-next-line no-unused-vars
  let faker;
  try {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    faker = require('faker');
  } catch (e) {
    log('Faker not found, mock data will not be created.');
    return;
  }

  log(`Faking create mock data`);
};
