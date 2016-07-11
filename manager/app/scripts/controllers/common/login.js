'use strict';
angular.module('managerApp').controller('LoginModalController', function ($uibModalInstance) {
  var vm = this;
  vm.submit = function () {
    $uibModalInstance.close(vm.user);
  };
}).service('loginModal', function ($uibModal) {
  this.show = function () {
    var modal = $uibModal.open({
      animation: true,
      templateUrl: 'views/common/loginModal.html',
      controller: 'LoginModalController as vm'
    });
    return modal.result;
  };
});
