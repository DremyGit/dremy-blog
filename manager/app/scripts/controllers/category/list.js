'use strict';
angular.module('managerApp').controller('CategoryListController', function ($uibModal, Category) {
  var vm = this;
  vm.categories = Category.query();
  function openModal(category) {
    return $uibModal.open({
      animation: true,
      templateUrl: 'views/category/editModal.html',
      controller: 'CategoryEditModalController',
      resolve: {
        category: function () {
          return angular.copy(category);
        }
      }
    });
  }
  vm.create = function () {
    var modalInstance = openModal({});
    modalInstance.result.then(function (category) {
      console.log(category);
    });
  };
  vm.edit = function (category) {
    var modalInstance = openModal(category);
    modalInstance.result.then(function (newCategory) {
      console.log(newCategory);
    });
  };
});

angular.module('managerApp').controller('CategoryEditModalController', function ($scope, $uibModalInstance, category) {
  $scope.category = category;
  $scope.isNew = !category._id;

  $scope.ok = function () {
    $uibModalInstance.close($scope.category);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
