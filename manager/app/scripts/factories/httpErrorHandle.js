'use strict';
angular.module('managerApp').factory('HttpErrorHandle', function ($q, $injector, Configs) {
  return {
    responseError: function (rejection) {
      if (rejection.config) {
        var Alert = $injector.get('Modal');
        if (rejection.config && new RegExp('^' + Configs.API_BASE).test(rejection.config.url)) {
          Alert.open('API 错误: ' + rejection.data.message);
        } else {
          Alert.open('网络错误, 请重试');
        }
      }
      return $q.reject(rejection);
    }
  };
});
