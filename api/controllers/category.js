const categoryController = require('express').Router();
const assertAndSetId = require('../middlewares/database').assertAndSetId;
const adminRequired = require('../middlewares/auth').adminRequired;
const models = require('../models');
const Category = models.Category;
const Blog = models.Blog;

categoryController.route('/')
  /**
   * @api {get} /categories Get all categories
   * @apiName getAllCategories
   * @apiGroup Category
   *
   * @apiSuccess {Object[]} categories All categories
   */
  .get((req, res, next) => {
    Category.getAllCategories().then(categories => {
      res.success(categories);
    }).catch(next);
  })

  /**
   * @api {post} /categories Create new category
   * @apiPermission admin
   * @apiName createNewCategory
   * @apiGroup Category
   *
   * @apiParam {Object} category Category object to be created
   * @apiSuccess (201) {Object} category Created category
   */
  .post(adminRequired, (req, res, next) => {
    const body = req.body;
    const _category = new Category({
      name: body.name
    });
    _category.save().then(category => {
      res.success(category, 201);
    }).catch(next);
  });

categoryController.route('/:categoryName')
  .all(assertAndSetId('categoryName', Category))

  /**
   * @api {get} /categories/:categoryId Get category by id
   * @apiName getCategoryById
   * @apiGroup Category
   *
   * @apiParam {String} categoryId
   * @apiSuccess {Object} category
   */
  .get((req, res, next) => {
    Category.getCategoryById(req.params.categoryId).then(category => {
      res.success(category);
    }).catch(next);
  })

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
  .put(adminRequired, (req, res, next) => {
    const body = req.body;
    Category.getCategoryById(req.params.categoryId).then(category => {
      return Object.assign(category, body).save()
    }).then(category => {
      res.success(category, 201);
    }).catch(next);
  })

  /**
   * @api {delete} /categories/:categoryId Delete category
   * @apiPermission admin
   * @apiName deleteCategory
   * @apiGroup Category
   *
   * @apiParam {String} categoryId
   * @apiSuccess 204
   */
  .delete(adminRequired, (req, res, next) => {
    Category.removeCategoryById(req.params.categoryId).then(() => {
      res.success(null, 204);
    }).catch(next);
  });

categoryController.route('/:categoryId/blogs')
  /**
   * @api {get} /categories/:categoryId/blogs Get blogs by category id
   * @apiName getBlogsByCategoryId
   * @apiGroup Category
   *
   * @apiParam {String} categoryId
   * @apiSuccess {Object[]} blogs Blogs belong to the category
   */
  .get((req, res, next) => {
    Category.getCategoryById(req.params.categoryId).then(category => {
      const promises = category.blogs.map(Blog.getBlogById.bind(Blog));
      return Promise.all(promises);
    }).then(blogs => {
      res.success(blogs);
    }).catch(next);
  });

module.exports = categoryController;
