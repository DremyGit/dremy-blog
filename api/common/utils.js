const utils = {};

utils.isObjectId = (id) =>
  typeof id === 'string' && id.match(/^[0-9a-fA-F]{24}$/);

module.exports = utils;