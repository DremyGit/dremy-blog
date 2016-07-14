'use strict';

angular.module('managerApp').controller('CommentListController', function (Comment, Modal, Alert) {
  var vm = this;
  vm.comments = Comment.query();
  vm.delete = function (comment) {
    Modal.open('是否删除评论: "' + comment.content + '"').then(function (confirm) {
      if (confirm) {
        Comment.delete({id: comment._id}).$promise.then(function () {
          Alert.show('删除评论成功');
          vm.comments = Comment.query();
        })
      }
    });
  };
});
