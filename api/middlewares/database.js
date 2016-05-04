//const models = require('../models');
const HttpError = require('../common/http-error');
const utils = require('../common/utils');

const database = {};

database.assertObjectExisted = (param, model) =>
   (req, res, next) => {
    const id = req.params[param];
    if (utils.isObjectId(id)) {
      model.findById(id).exec().then(object => {
        if (!object) {
          throw new HttpError.NotFoundError('Not found');
        }
        next();
      }).catch(next);
    } else {
      next('route');
    }
};

module.exports = database;