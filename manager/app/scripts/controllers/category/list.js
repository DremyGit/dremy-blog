'use strict';
angular.module('managerApp').controller('CategoryListController', function ($uibModal) {
  var vm = this;
  vm.categories = [{"_id":"57301d3189d0867808ed5028","name":"分类1","code":"cate-1","count":3},{"_id":"57301d3c89d0867808ed5029","name":"分类2","code":"cate-2","count":1},{"_id":"57301f9a89d0867808ed502d","name":"分类3","code":"cate-3","count":0}];
  vm.edit = function (category) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'views/category/editModal.html',
      controller: 'CategoryEditModalController',
      resolve: {
        //items: function () {
        //  return $scope.items;
        //}
        category: function () {
          return angular.copy(category);
        }
      }
    });

    modalInstance.result.then(function (category) {
      console.log(category);
    });
  };
});

angular.module('managerApp').controller('CategoryEditModalController', function ($scope, $uibModalInstance, category) {
  $scope.category = category;

  $scope.ok = function () {
    $uibModalInstance.close($scope.category);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
