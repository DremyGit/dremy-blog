/**
 * Dremy api router
 */
const controllers = require('../controllers');

const router = (app) => {

  app.use('/blogs',     controllers.blog);
  app.use('/comments',  controllers.comment);
  app.use('/messages',  controllers.message);
  app.use('/tags',      controllers.tag);
  app.use('/archives',  controllers.archive);
  app.use('/works',     controllers.work);
};

module.exports = router;