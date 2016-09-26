'use strict';

angular.module('managerApp').controller('BlogListController', function (Blog, Modal, Alert) {
  var vm = this;
  vm.blogs = Blog.query();
  vm.delete = function (blog) {
    Modal.open('是否要删除文章《' + blog.title +'》?').then(function (confirm) {
      if (confirm) {
        Blog.delete({blogName: blog._id}).$promise.then(function () {
          Alert.show('删除文章《' + blog.title +'》成功');
          vm.blogs = Blog.query();
        });
      }
    });
  };
  vm.updateAll = function () {
    Blog.update().$promise.then(function(data) {
      Alert.show('刷新成功, 共刷新 ' + data.count + ' 篇文章');
    });
  }
});
