'use strict';
angular.module('managerApp').factory('Comment', function ($resource, Configs) {
  return $resource(Configs.API_BASE + '/comments/:id', {id: '@id'}, {update: {method: 'PUT'}});
});
