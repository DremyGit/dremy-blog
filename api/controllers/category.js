'use strict';
const categoryController = require('express').Router();
const assertAndSetId = require('../middlewares/database').assertAndSetId;
const adminRequired = require('../middlewares/auth').adminRequired;
const models = require('../models');
const cache = require('../common/cache');
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
    cache.get('categories', (err, cache_categories) => {
      if (cache_categories) {
        res.success(cache_categories);
      } else {
        let categories_g;
        Category.getAllCategories().then(categories => {
          categories_g = categories;
          return Promise.all(categories.map(category =>
            Blog.find({category: category._id}).count().exec()));
        }).then(bookCounts => {
          const _categories = categories_g.map((category, i) =>
            Object.assign(category.toObject(), {count: bookCounts[i]}));
          res.success(_categories);
          cache.set('categories', _categories, 600);
        }).catch(next);
      }
    });
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
    const _category = Object.assign(new Category(), body);
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
    const categoryId = req.params.categoryId;
    let category_g;
    Category.getCategoryById(req.params.categoryId).then(category => {
      category_g = category.toObject();
      const query = [{category: categoryId}, {markdown: 0, html: 0}];
      return Blog.getBlogsByQuery(query)
    }).then(blogs => {
      category_g.blogs = blogs;
      res.success(category_g);
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


module.exports = categoryController;
