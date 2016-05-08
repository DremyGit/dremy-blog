//const models = require('../models');
const HttpError = require('../common/http-error');
const utils = require('../common/utils');

const database = {};

database.assertAndSetId = (paramName, model) =>
  (req, res, next) => {
    // Do nothing for objectId except assert existed
    const param = req.params[paramName];
    const paramIdName = paramName.replace('Name', '') + 'Id';
    if (utils.isObjectId(param)) {
      model.findById(param).exec().then(object => {
        if (!object) {
          throw new HttpError.NotFoundError('Not found');
        }
        req.params[paramIdName] = param;
        next();
      }).catch(next);
    } else {
    // assert object existed and change code to id
      model.findOne({code: param}).exec().then(object => {
        if (!object) {
          throw new HttpError.NotFoundError('Not found');
        }
        req.params[paramIdName] = object._id;
        next();
      }).catch(next);
    }
  };

//database.assertObjectExisted = (param, model) =>
//   (req, res, next) => {
//    const id = req.params[param];
//    if (utils.isObjectId(id)) {
//      model.findById(id).exec().then(object => {
//        if (!object) {
//          throw new HttpError.NotFoundError('Not found');
//        }
//        next();
//      }).catch(next);
//    } else {
//      next('route');
//    }
//};

module.exports = database;