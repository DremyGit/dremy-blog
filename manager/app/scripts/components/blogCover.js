'use strict';
angular.module('managerApp').directive('blogCover', function () {
  return {
    restrict: 'AE',
    scope: {
      field: '@',
      model: '='
    },
    require: ['model', 'field'],
    templateUrl: 'views/components/blogCover.html',
    controller: 'blogCoverController'
  };
});
angular.module('managerApp').controller('blogCoverController', function ($scope, $http, mdService, Configs) {
  var uploadOption = mdService.getUploadOption($scope.field, function (up, file, info) {
    var key = JSON.parse(info).key;
    var uploadedUrl = Configs.UPLOAD_DOMAIN + '/' + key;
    $scope.model[$scope.field] = uploadedUrl;
    $scope.$apply();
  });
  var uploader;
  $http.get(Configs.API_BASE + '/uptoken').then(function (res) {
    uploadOption.uptoken = res.data.uptoken;
    uploader = new window.QiniuJsSDK().uploader(uploadOption);
  });
});
