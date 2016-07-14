'use strict';
angular.module('managerApp').controller('BlogEditController', function ($stateParams, Blog, Category, Tag) {
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
      alert('请选择分类');
    }

    blog.tags = filteTags(blog.tags);
    var data = window.easycopy(blog, ['title', 'code', 'category', 'tags', 'create_at', 'markdown']);
    if (blog._id) {
      Blog.update({blogName: blog._id}, data);
    } else {
      Blog.save(data);
    }
    console.log(data);
  };
});
