'use strict';
angular.module('managerApp').factory('Category', function ($resource, Configs) {
  return $resource(Configs.API_BASE + '/categories/:code', {code: '@code'}, {update: {method: 'PUT'}});
});
