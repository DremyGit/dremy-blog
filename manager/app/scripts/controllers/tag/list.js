'use strict';
angular.module('managerApp').controller('TagListController', function ($uibModal) {
  var vm = this;
  vm.tags = [{"_id":"573027c7907b850c0e333979","name":"标签1","code":"tag-1","count":2},{"_id":"573027d2907b850c0e33397a","name":"标签2","code":"tag-2","count":3},{"_id":"573027da907b850c0e33397b","name":"标签3","code":"tag-3","count":0}];
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
  vm.create = function () {
    var modalInstance = openModal({});
    modalInstance.result.then(function (tag) {
      console.log(tag);
    });
  };
  vm.edit = function (tag) {
    var modalInstance = openModal(tag);
    modalInstance.result.then(function (newTag) {
      console.log(newTag);
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
