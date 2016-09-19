'use strict';
angular.module('managerApp').constant('Configs', {
  API_BASE: '/api',
  UPLOAD_DOMAIN: 'http://the-file-upload-domain',
  UPLOAD_PREFIX: 'the/prefix/of/path/',
  UPLOAD_SUFFIX: function () {
    return '_' + new Date().getMilliseconds();
  }
});
