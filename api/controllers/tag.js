const tagController = require('express').Router();
const assertAndSetId = require('../middlewares/database').assertAndSetId;
const adminRequired = require('../middlewares/auth').adminRequired;
const models = require('../models');
const Tag = models.Tag;
const Blog = models.Blog;

tagController.route('/')
  /**
   * @api {get} /tags Get all tags
   * @apiName getAllTags
   * @apiGroup Tag
   *
   * @apiSuccess {Object[]} tags All tags
   */
  .get((req, res, next) => {
    Tag.getAllTags().then(tags => {
      res.success(tags);
    }).catch(next);
  })

  /**
   * @api {post} /tags Create new tag
   * @apiPermission admin
   * @apiName createNewTag
   * @apiGroup Tag
   *
   * @apiParam {Object} tag Tag object to be created
   * @apiSuccess (201) {Object} tag Created tag
   */
  .post(adminRequired, (req, res, next) => {
    const body = req.body;
    const _tag = new Tag({
      name: body.name,
      blogs: []
    });
    _tag.save().then(tag => {
      res.success(tag, 201);
    }).catch(next);
  });

tagController.route('/:tagId')
  .all(assertAndSetId('tagId', Tag))

  /**
   * @api {get} /tags/:tagId Get tag by id
   * @apiName getTagById
   * @apiGroup Tag
   *
   * @apiParam {String} tagId
   * @apiSuccess {Object} tag
   */
  .get((req, res, next) => {
    Tag.getTagById(req.params.tagId).then(tag => {
      res.success(tag);
    }).catch(next);
  })

  /**
   * @api {put} /tags/:tagId Update tag
   * @apiPermission admin
   * @apiName updateTag
   * @apiGroup Tag
   *
   * @apiParam {String} tagId
   * @apiParam {Object} tag
   * @apiSuccess (201) {Object} tag Tag after updated
   */
  .put(adminRequired, (req, res, next) => {
    const body = req.body;
    Tag.getTagById(req.params.tagId).then(tag => {
      return Object.assign(tag, body).save()
    }).then(tag => {
      res.success(tag, 201);
    }).catch(next);
  })

  /**
   * @api {delete} /tags/:tagId Delete tag
   * @apiPermission admin
   * @apiName deleteTag
   * @apiGroup Tag
   *
   * @apiParam {String} tagId
   * @apiSuccess 204
   */
  .delete(adminRequired, (req, res, next) => {
    Tag.removeTagById(req.params.tagId).then(() => {
      res.success(null, 204);
    }).catch(next);
  });

tagController.route('/:tagId/blogs')
  /**
   * @api {get} /tags/:tagId/blogs Get blogs by tag id
   * @apiName getBlogsByTagId
   * @apiGroup Tag
   *
   * @apiParam {String} tagId
   * @apiSuccess {Object[]} blogs Blogs belong to the tag
   */
  .get((req, res, next) => {
    Tag.getTagById(req.params.tagId).then(tag => {
      const promises = tag.blogs.map(Blog.getBlogById.bind(Blog));
      return Promise.all(promises);
    }).then(blogs => {
      res.success(blogs);
    }).catch(next);
  });

module.exports = tagController;