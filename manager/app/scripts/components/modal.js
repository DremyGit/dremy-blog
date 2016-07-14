'use strict';
angular.module('managerApp').service('Modal', function ($uibModal) {
  this.open = function (message) {
    var modal = $uibModal.open({
      animation: true,
      templateUrl: 'views/components/modal.html',
      controller: 'ModalController',
      keyboard: 'false',
      backdrop: 'static',
      resolve: {
        message: function () {
          return message;
        }
      }
    });
    return modal.result;
  };
}).controller('ModalController', function ($scope, $uibModalInstance, message) {
  $scope.message = message;

  $scope.ok = function () {
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

