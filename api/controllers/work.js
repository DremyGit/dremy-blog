const workController = require('express').Router();
const Work = require('../models').Work;
const assertExisted = require('../middlewares/database').assertObjectExisted;

workController.route('/')

  /**
   * @api {get} /works Get all works
   * @apiName GetAllWorks
   * @apiGroup Work
   * @apiSuccess {Object[]} works All works
   */
  .get((req, res, next) => {
    Work.getAllWorks().then(works => {
      res.success(works)
    }).then(next);
  })


  /**
   * @api {post} /works Create new work
   * @apiName CreateWork
   * @apiGroup Work
   *
   * @apiParam {Object} work
   * @apiSuccess {Object} work Created work
   */
  .post((req, res, next) => {
    const body = req.body;
    const _work = new Work({
      name: body.name,
      introduction: body.introduction,
      url: body.url,
      picUrl: body.picUrl
    });
    _work.save().then(work => {
      res.success(work, 201);
    }).catch(next);
  });


workController.route('/:workId')
  .all(assertExisted('workId', Work))


  /**
   * @api {put} /works/:workId Update work by id
   * @apiName UpdateWork
   * @apiGroup Work
   *
   * @apiParam {String} workId
   * @apiParam {Object} work
   * @apiSuccess {Object} work Updated work
   */
  .put((req, res, next) => {
    const workId = req.params.workId;
    const body = req.body;
    Work.getWorkById(workId).then(work => {
      Object.assign(work, body);
      return work.save();
    }).then(work => {
      res.success(work, 201);
    }).catch(next);
  })


  /**
   * @api {delete} /works/:workId Delete work by id
   * @apiName DeleteWork
   * @apiGroup Work
   *
   * @apiParam {String} workId
   * @apiSuccess {Object} work Updated work
   */
  .delete((req, res, next) => {
    const workId = req.params.workId;
    Work.removeWorkById(workId).then(() => {
      res.success(null, 204);
    }).catch(next);
});



module.exports = workController;