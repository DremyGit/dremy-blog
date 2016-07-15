'use strict';
angular.module('managerApp').controller('BlogEditController',
  function ($stateParams, Blog, Category, Tag, Modal, Alert) {
    var vm = this;
    var blogName = $stateParams.blogName;
    vm.blog = {};
    if (blogName) {
      vm.blog = Blog.get({blogName: blogName});
    }
    vm.categories = Category.query();
    vm.tags       = Tag.query();

    vm.submit = function (blog) {
      function filteTags(tags) {
        var length = 0;
        for (var i in tags) {
          length++;
        }
        i = length;
        tags.length = length;
        return Array.prototype.slice.call(tags).filter(function (tag) {
          return !!tag;
        });
      }

      if (!blog.category) {
        Modal.open('请选择分类');
        return;
      }

      blog.tags = filteTags(blog.tags);
      var data = window.easycopy(blog, ['title', 'code', 'category', 'tags', 'create_at', 'markdown']);
      if (blog._id) {
        Blog.update({blogName: blog._id}, data).$promise.then(function () {
          Alert.show('修改文章成功', 'success');
          window.location.href = '#/blogs/' + blog.code;
        });
      } else {
        Blog.save(data).$promise.then(function () {
          Alert.show('新建文章成功', 'success');
          window.location.href = '#/blogs/' + blog.code;
        });
      }
    };
  });
