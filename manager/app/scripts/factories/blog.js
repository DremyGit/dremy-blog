'use strict';
angular.module('managerApp').factory('Blog', function ($resource, Configs) {
  return $resource(Configs.API_BASE + '/blogs/:blogName', {blogName: '@blogName'}, {
    update: {method: 'PUT'}
  });
});
