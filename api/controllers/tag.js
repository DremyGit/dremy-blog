'use strict';
const tagController = require('express').Router();
const assertAndSetId = require('../middlewares/database').assertAndSetId;
const adminRequired = require('../middlewares/auth').adminRequired;
const cache = require('../common/cache');
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
    cache.get('tags', (err, cache_tags) => {
      if (cache_tags) {
        res.success(cache_tags);
      } else {
        Tag.getTagsWithBlogCount().then(tags => {
          res.success(tags);
          cache.set('tags', tags);
        }).catch(next);
      }
    });
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
    const _tag = Object.assign(new Tag(), body);
    _tag.save().then(tag => {
      res.success(tag, 201);
    }).catch(next);
  });

tagController.route('/:tagName')
  .all(assertAndSetId('tagName', Tag))

  /**
   * @api {get} /tags/:tagId Get tag by id
   * @apiName getTagById
   * @apiGroup Tag
   *
   * @apiParam {String} tagId
   * @apiSuccess {Object} tag
   */
  .get((req, res, next) => {
    const tagId = req.params.tagId;
    let tag_g;
    Tag.getTagById(tagId).then(tag => {
      tag_g = tag.toObject();
      const query = [{tags: tagId}, {markdown: 0, html: 0}];
      return Blog.getBlogsByQuery(query);
    }).then(blogs => {
      tag_g.blogs = blogs;
      res.success(tag_g);
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
    const tagId = req.params.tagId;
    Tag.removeTagById(tagId).then(() => {
      return Blog.removeTagInBlog(tagId)
    }).then(() => {
      res.success(null, 204);
    }).catch(next);
  });

module.exports = tagController;