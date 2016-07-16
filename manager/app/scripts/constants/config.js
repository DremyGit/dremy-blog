'use strict';
angular.module('managerApp').constant('Configs', {
  API_BASE: '/api',
  UPLOAD_DOMAIN: 'http://oae5h71lc.bkt.clouddn.com',
  UPLOAD_PREFIX: 'images/blog/test/',
  UPLOAD_SUFFIX: '_' + new Date().getMilliseconds()
});
