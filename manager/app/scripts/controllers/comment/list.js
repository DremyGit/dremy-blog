'use strict';

angular.module('managerApp').controller('CommentListController',
      function ($uibModal, $http, Configs, Comment, Modal, Alert) {
  var vm = this;
  vm.comments = Comment.query();
  vm.delete = function (comment) {
    Modal.open('是否删除评论: "' + comment.content + '"').then(function (confirm) {
      if (confirm) {
        Comment.delete({id: comment._id}).$promise.then(function () {
          Alert.show('删除评论成功');
          vm.comments = Comment.query();
        });
      }
    });
  };
  vm.reply = function (comment) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/comment/replyModal.html',
      controller: 'ReplyModalController',
      resolve: {
        comment: function () {
          return comment;
        }
      }
    });
    modalInstance.result.then(function (reply) {
      var url = Configs.API_BASE + '/blogs/' + comment.blog.code + '/comments';
      $http.post(url, reply).then(function () {
        Alert.show('回复评论成功');
        vm.comments = Comment.query();
      });
    });
  };
});

angular.module('managerApp').controller('ReplyModalController', function ($scope, $uibModalInstance, comment) {
  $scope.comment = comment;
  $scope.reply = {
    user: 'Dremy',
    reply_id: comment._id
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.reply);
  };
  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
