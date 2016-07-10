'use strict';
angular.module('managerApp').factory('Tag', function ($resource, Configs) {
  return $resource(Configs.API_BASE + '/tags/:code', {code: '@code'}, {update: {method: 'PUT'}});
});
