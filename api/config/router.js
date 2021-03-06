/**
 * Dremy blog api router
 */
const controllers = require('../controllers');

const router = (app) => {

  app.use('/blogs',     controllers.blog);
  app.use('/comments',  controllers.comment);
  app.use('/messages',  controllers.message);
  app.use('/categories',controllers.category);
  app.use('/tags',      controllers.tag);
  app.use('/archives',  controllers.archive);
  app.use('/works',     controllers.work);
  app.use('/authorization',controllers.authorization);
  app.use('/uptoken',   controllers.upload);

  app.use((req, res, next) => {
    res.error('Not found', 404);
  })
};

module.exports = router;