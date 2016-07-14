'use strict';

angular.module('managerApp').controller('BlogListController', function (Blog) {
  var vm = this;
  vm.blogs = Blog.query();
  vm.delete = function (blog) {
    Blog.delete({blogName: blog._id}).$promise.then(function () {
      vm.blogs = Blog.query();
    });
  }
});
