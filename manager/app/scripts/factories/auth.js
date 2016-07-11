'use strict';
angular.module('managerApp').factory('Auth', function ($resource, Configs) {
  return $resource(Configs.API_BASE + '/authorization');
});
