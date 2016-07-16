angular.module('managerApp').directive('mdInput', function () {
  return {
    restrict: 'AE',
    // Pass a object to avoid the bind change
    scope: {
      field: '@',
      model: '='
    },
    require: ['model', 'field'],
    templateUrl: 'views/components/mdInput.html',
    controller: 'mdInputController'
  }
});
angular.module('managerApp').controller('mdInputController', function ($scope) {
  $scope.html = '';
  $scope.preview = function () {
    $scope.html = $scope.model[$scope.field];
  }
});
