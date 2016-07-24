'use strict';
const models = require('../models');
const Category = models.Category;
const Blog = models.Blog;

const categoryController = {};

/**
 * @api {get} /categories Get all categories
 * @apiName getAllCategories
 * @apiGroup Category
 *
 * @apiSuccess {Object[]} categories All categories
 */
categoryController.getAllCategories = (req, res, next) => {
  Category.getCategoriesWithBlogCount().then(categories => {
    res.success(categories);
  }).catch(next);
};

/**
 * @api {post} /categories Create new category
 * @apiPermission admin
 * @apiName createNewCategory
 * @apiGroup Category
 *
 * @apiParam {Object} category Category object to be created
 * @apiSuccess (201) {Object} category Created category
 */
categoryController.createCategory =  (req, res, next) => {
  const body = req.body;
  const _category = Object.assign(new Category(), body);
  Category.createCategory(_category).then(category => {
    res.success(category, 201);
  }).catch(next);
};

/**
 * @api {get} /categories/:categoryId Get category by id
 * @apiName getCategoryById
 * @apiGroup Category
 *
 * @apiParam {String} categoryId
 * @apiSuccess {Object} category
 */
categoryController.getCategoryById = (req, res, next) => {
  const categoryId = req.params.categoryId;
  let category_g;
  Category.getCategoryById(req.params.categoryId).then(category => {
    category_g = category.toObject();
    const query = {category: categoryId};
    const opt = {markdown: 0, html: 0};
    return Blog.getBlogsByQuery(query, opt)
  }).then(blogs => {
    category_g.blogs = blogs;
    res.success(category_g);
  }).catch(next);
};

/**
 * @api {put} /categories/:categoryId Update category
 * @apiPermission admin
 * @apiName updateCategory
 * @apiGroup Category
 *
 * @apiParam {String} categoryId
 * @apiParam {Object} category
 * @apiSuccess (201) {Object} category Category after updated
 */
categoryController.updateCategory =  (req, res, next) => {
  const body = req.body;
  Category.getCategoryById(req.params.categoryId,true).then(category => {
    return Category.updateCategory(Object.assign(category, body))
  }).then(category => {
    res.success(category, 201);
  }).catch(next);
};

/**
 * @api {delete} /categories/:categoryId Delete category
 * @apiPermission admin
 * @apiName deleteCategory
 * @apiGroup Category
 *
 * @apiParam {String} categoryId
 * @apiSuccess 204
 */
categoryController.deleteCategory =  (req, res, next) => {
  const categoryId = req.params.categoryId;
  Category.removeCategoryById(categoryId).then(() => {
    return Blog.removeCategoryInBlog(categoryId);
  }).then(() => {
    res.success(null, 204);
  }).catch(next);
};


module.exports = categoryController;
