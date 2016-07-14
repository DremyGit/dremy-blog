'use strict';
angular.module('managerApp').factory('Category', function ($resource, Configs) {
  return $resource(Configs.API_BASE + '/categories/:id', {id: '@id'}, {update: {method: 'PUT'}});
});
