'use strict';
angular.module('managerApp').service('Alert', function () {
  var self = this;
  this.alerts = [];
  this.show = function (message, type) {
    self.alerts.push({
      message: message,
      type: type || 'success',
      timeout: 10000
    });
  };
  this.close = function (index) {
    self.alerts.splice(index, 1);
  };
  this.getAlerts = function () {
    return self.alerts;
  };
}).controller('AlertController', function ($scope, Alert) {
  $scope.show = Alert.show;
  $scope.close = Alert.close;
  $scope.alerts = Alert.getAlerts();
}).directive('alertDiv', function ($compile) {
  return {
    restrict: 'AE',
    controller: 'AlertController',
    link: function (scope, element) {
      element.append($compile('<uib-alert ng-repeat="alert in alerts" type="{{alert.type}}" close="close($index)" dismiss-on-timeout="{{alert.timeout}}">{{alert.message}}</uib-alert>')(scope));
    }
  };
});
