const blogController = require('express').Router();

blogController.route('/')

  .get((req, res) => res.success({msg: "hello"}));

blogController.route('/tags')

  .get((req, res, next) => {
    //res.end(JSON.stringify({msg: "Hello tags"}))
    return next(new Error("haha"));
  });

module.exports = blogController;