'use strict';
angular.module('managerApp').factory('HttpErrorHandle', function ($q, $injector, Configs) {
  return {
    responseError: function (rejection) {
      if (rejection.config) {
        if (rejection.config && new RegExp('^' + Configs.API_BASE).test(rejection.config.url)) {
          window.alert('API 错误: ' + rejection.data.message);
        } else {
          window.alert('网络错误, 请重试');
        }
      }
      return $q.reject(rejection);
    }
  };
});
