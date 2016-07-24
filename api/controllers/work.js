const Work = require('../models').Work;

const workController = {};

/**
 * @api {get} /works Get all works
 * @apiName GetAllWorks
 * @apiGroup Work
 * @apiSuccess {Object[]} works All works
 */
workController.getAllWorks = (req, res, next) => {
  Work.getAllWorks().then(works => {
    res.success(works)
  }).catch(next);
};


/**
 * @api {post} /works Create new work
 * @apiPermission admin
 * @apiName CreateWork
 * @apiGroup Work
 *
 * @apiParam {Object} work
 * @apiSuccess {Object} work Created work
 */
workController.createWork = (req, res, next) => {
  const body = req.body;
  const _work = Object.assign(new Work(), body);
  Work.createWork(_work).then(work => {
    res.success(work, 201);
  }).catch(next);
};


/**
 * @api {put} /works/:workId Update work by id
 * @apiPermission admin
 * @apiName UpdateWork
 * @apiGroup Work
 *
 * @apiParam {String} workId
 * @apiParam {Object} work
 * @apiSuccess {Object} work Updated work
 */
workController.updateWork = (req, res, next) => {
  const workId = req.params.workId;
  const body = req.body;
  Work.getWorkById(workId, true).then(work => {
    Object.assign(work, body);
    return Work.updateWork(work);
  }).then(work => {
    res.success(work, 201);
  }).catch(next);
};


/**
 * @api {delete} /works/:workId Delete work by id
 * @apiPermission admin
 * @apiName DeleteWork
 * @apiGroup Work
 *
 * @apiParam {String} workId
 * @apiSuccess {Object} work Updated work
 */
workController.deleteWork = (req, res, next) => {
  const workId = req.params.workId;
  Work.removeWorkById(workId).then(() => {
    res.success(null, 204);
  }).catch(next);
};



module.exports = workController;