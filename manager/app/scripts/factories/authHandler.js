'use strict';
angular.module('managerApp').factory('AuthHandler', function ($q, $injector, Configs) {
  return {
    request: function (config) {
      console.log(config);
      if (new RegExp('^' + Configs.API_BASE).test(config.url)) {
        var token = window.sessionStorage.getItem('token');
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = 'Bearer ' + token;
        }
      }
      return config;
    },
    responseError: function (rejection) {
      switch (rejection.status) {
        case 401:
          var loginModal = $injector.get('loginModal');
          return loginModal.show().then(function (user) {
            var Auth = $injector.get('Auth');
            return Auth.save(user).$promise;
          }).then(function (res) {
            window.sessionStorage.setItem('token', res.token);
            var $http = $injector.get('$http');
            return $http(rejection.config);
          });
          break;

        case 400:
          if (/\/authorization/.test(rejection.config.url)) {
            window.alert('密码输入错误,请刷新页面');
          }
          return $q.reject(rejection);

        default:
          return $q.reject(rejection);
      }
    }
  };
});
