module.exports = (condition, message) => {
  if (!condition) throw new Error(message);
};
