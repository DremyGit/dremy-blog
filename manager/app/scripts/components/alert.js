'use strict';
angular.module('managerApp').service('Alert', function ($uibModal) {
  this.open = function (message) {
    var modal = $uibModal.open({
      animation: true,
      templateUrl: 'views/components/alert.html',
      controller: 'AlertController',
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
}).controller('AlertController', function ($scope, $uibModalInstance, message) {
  $scope.message = message;

  $scope.ok = function () {
    $uibModalInstance.close(true);
  };

  $scope.cancel = function () {
    $uibModalInstance.$dismiss('cancel');
  }
});

