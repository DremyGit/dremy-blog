const router = require('express').Router();
const auth = require('../middlewares/auth');
const assertAndSetId = require('../middlewares/database').assertAndSetId;
const archiveController = require('./archive');
const authorizationController = require('./authorization');
const blogController = require('./blog');
const categoryController = require('./category');
const commentController = require('./comment');
const messageController = require('./message');
const tagController = require('./tag');
const uploadController = require('./upload');
const workController = require('./work');
const xml = require('./xml');
const models = require('../models');
const Blog = models.Blog;
const Comment = models.Comment;
const Category = models.Category;
const Tag = models.Tag;
const Work = models.Work;

router.route('/blogs')
  .get(blogController.getAllBlogs)
  .post(auth.adminRequired, blogController.createBlog)
  .put(auth.adminRequired, blogController.updateAllBlogs);

router.route('/blogs/markdown')
  .post(auth.adminRequired, blogController.markdown);

router.route('/blogs/:blogName')
  .all(assertAndSetId('blogName', Blog))
  .get(blogController.getBlogById)
  .put(auth.adminRequired, blogController.updateBlog)
  .delete(auth.adminRequired, blogController.deleteBlog);

router.route('/blogs/:blogName/comments')
  .all(assertAndSetId('blogName', Blog))
  .get(blogController.getCommentsByBlogId)
  .post(blogController.createComment);

router.route('/comments')
  .get(auth.adminRequired, commentController.getAllComments);

router.route('/comments/:commentId')
  .all(assertAndSetId('commentId', Comment))
  .get(auth.adminRequired, commentController.getCommentById)
  .delete(auth.adminRequired, commentController.deleteComment);

router.route('/comments/:commentId/supports')
  .all(assertAndSetId('commentId', Comment))
  .post(commentController.addSupport)
  .delete(commentController.decreateSupport);

router.route('/messages')
  .get(messageController.getAllMessages)
  .post(messageController.createMessage);

router.route('/messages/:messageId')
  .all(assertAndSetId('messageId', Comment))
  .delete(auth.adminRequired, messageController.deleteMessage);


router.route('/categories')
  .get(categoryController.getAllCategories)
  .post(auth.adminRequired, categoryController.createCategory);

router.route('/categories/:categoryName')
  .all(assertAndSetId('categoryName', Category))
  .get(categoryController.getCategoryById)
  .put(auth.adminRequired, categoryController.updateCategory)
  .delete(auth.adminRequired, categoryController.deleteCategory);

router.route('/tags')
  .get(tagController.getAllTags)
  .post(auth.adminRequired, tagController.createTag);

router.route('/tags/:tagName')
  .all(assertAndSetId('tagName', Tag))
  .get(tagController.getTagById)
  .put(auth.adminRequired, tagController.updateTag)
  .delete(auth.adminRequired, tagController.deleteTag);

router.route('/works')
  .get(workController.getAllWorks)
  .post(auth.adminRequired, workController.createWork);

router.route('/works/:workName')
  .all(assertAndSetId('workName', Work))
  .put(auth.adminRequired, workController.updateWork)
  .delete(auth.adminRequired, workController.deleteWork);

router.route('/archives')
  .get(archiveController.getArchives);

router.route('/archives/:year/:month/blogs')
  .get(archiveController.getBlogsByArchive);

router.route('/authorization')
  .post(authorizationController.authorize);

router.route('/uptoken')
  .get(auth.adminRequired, uploadController.getUptoken);

router.get('/sitemap.xml', xml.sitemap);
router.get('/rss.xml', xml.rss);

module.exports = router;

