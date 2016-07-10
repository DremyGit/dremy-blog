'use strict';
angular.module('managerApp').controller('BlogEditController', function ($stateParams, Blog, Category, Tag) {
  var vm = this;
  vm.blog = Blog.get({code: $stateParams.blogName});
  vm.categories = Category.query();
  vm.tags = Tag.query();
  vm.submit = function (obj) {
    console.log(obj);
  };
});
