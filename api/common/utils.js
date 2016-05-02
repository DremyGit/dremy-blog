const utils = {};

utils.isObjectId = (id) => id.match(/^[0-9a-fA-F]{24}$/);

module.exports = utils;