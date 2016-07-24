'use strict';
const models = require('../models');
const Tag = models.Tag;
const Blog = models.Blog;

const tagController = {};

/**
 * @api {get} /tags Get all tags
 * @apiName getAllTags
 * @apiGroup Tag
 *
 * @apiSuccess {Object[]} tags All tags
 */
tagController.getAllTags = (req, res, next) => {
  Tag.getTagsWithBlogCount().then(tags => {
    res.success(tags);
  }).catch(next);
};

/**
 * @api {post} /tags Create new tag
 * @apiPermission admin
 * @apiName createNewTag
 * @apiGroup Tag
 *
 * @apiParam {Object} tag Tag object to be created
 * @apiSuccess (201) {Object} tag Created tag
 */
tagController.createTag = (req, res, next) => {
  const body = req.body;
  const _tag = Object.assign(new Tag(), body);
  Tag.createTag(_tag).then(tag => {
    res.success(tag, 201);
  }).catch(next);
};


/**
 * @api {get} /tags/:tagId Get tag by id
 * @apiName getTagById
 * @apiGroup Tag
 *
 * @apiParam {String} tagId
 * @apiSuccess {Object} tag
 */
tagController.getTagById = (req, res, next) => {
  const tagId = req.params.tagId;
  let tag_g;
  Tag.getTagById(tagId).then(tag => {
    tag_g = tag.toObject();
    const query = {tags: tagId};
    const opt = {markdown: 0, html: 0};
    return Blog.getBlogsByQuery(query, opt);
  }).then(blogs => {
    tag_g.blogs = blogs;
    res.success(tag_g);
  }).catch(next);
};

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
tagController.updateTag = (req, res, next) => {
  const body = req.body;
  Tag.getTagById(req.params.tagId, true).then(tag => {
    return Object.assign(tag, body).save()
  }).then(tag => {
    res.success(tag, 201);
  }).catch(next);
};

/**
 * @api {delete} /tags/:tagId Delete tag
 * @apiPermission admin
 * @apiName deleteTag
 * @apiGroup Tag
 *
 * @apiParam {String} tagId
 * @apiSuccess 204
 */
tagController.deleteTag = (req, res, next) => {
  const tagId = req.params.tagId;
  Tag.removeTagById(tagId).then(() => {
    return Blog.removeTagInBlog(tagId)
  }).then(() => {
    res.success(null, 204);
  }).catch(next);
};

module.exports = tagController;