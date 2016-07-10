'use strict';
angular.module('managerApp').factory('Message', function ($resource, Configs) {
  return $resource(Configs.API_BASE + '/message/:id', {id: '@id'}, {update: {method: 'PUT'}});
});
