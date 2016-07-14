'use strict';
angular.module('managerApp').controller('TagListController',
  function ($uibModal, Tag, Modal, Alert) {
    var vm = this;
    vm.tags = Tag.query();
    function openModal(tag) {
      return $uibModal.open({
        animation: true,
        templateUrl: 'views/tag/editModal.html',
        controller: 'TagEditModalController',
        resolve: {
          tag: function () {
            return angular.copy(tag);
          }
        }
      });
    }
    function refreshTags() {
      vm.tags = Tag.query();
    }
    vm.create = function () {
      var modalInstance = openModal({});
      modalInstance.result.then(function (tag) {
        Tag.save({}, tag).$promise.then(function () {
          Alert.show('新建标签 ' + tag.name + ' 成功');
          refreshTags();
        })
      });
    };
    vm.edit = function (tag) {
      var modalInstance = openModal(tag);
      modalInstance.result.then(function (newTag) {
        Tag.update({id: tag.code}, newTag).$promise.then(function () {
          Alert.show('修改标签成功');
          refreshTags();
        })
      });
    };
    vm.delete = function (tag) {
      Modal.open('是否删除标签 ' + tag.name).then(function (confirm) {
        if (confirm) {
          Tag.delete({id: tag._id}).$promise.then(function () {
            Alert.show('删除标签成功');
            refreshTags();
          })
        }
      });
    };
  });

angular.module('managerApp').controller('TagEditModalController', function ($scope, $uibModalInstance, tag) {
  $scope.tag = tag;
  $scope.isNew = !tag._id;

  $scope.ok = function () {
    $uibModalInstance.close($scope.tag);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
