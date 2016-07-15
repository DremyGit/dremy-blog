'use strict';
angular.module('managerApp').controller('CategoryListController',
  function ($uibModal, Category, Modal, Alert) {
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
    function refreshCategory() {
      vm.categories = Category.query();
    }
    vm.create = function () {
      var modalInstance = openModal({});
      modalInstance.result.then(function (category) {
        Category.save({}, category).$promise.then(function () {
          Alert.show('新建分类 ' + category.name + ' 成功');
          refreshCategory();
        });
      });
    };
    vm.edit = function (category) {
      var modalInstance = openModal(category);
      modalInstance.result.then(function (newCategory) {
        Category.update({id: category.code}, newCategory).$promise.then(function () {
          Alert.show('修改分类成功');
          refreshCategory();
        });
      });
    };
    vm.delete = function (category) {
      Modal.open('是否删除分类 ' + category.name).then(function (confirm) {
        if (confirm) {
          Category.delete({id: category._id}).$promise.then(function () {
            Alert.show('删除分类成功');
            refreshCategory();
          });
        }
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
