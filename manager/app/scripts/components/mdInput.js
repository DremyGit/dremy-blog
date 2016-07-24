'use strict';
angular.module('managerApp').directive('mdInput', function () {
  return {
    restrict: 'AE',
    // Pass a object to avoid the bind change
    scope: {
      field: '@',
      model: '='
    },
    require: ['model', 'field'],
    templateUrl: 'views/components/mdInput.html',
    controller: 'mdInputController'
  };
});
angular.module('managerApp').controller('mdInputController', function ($scope, $http, $sce, mdService, Configs) {
  var uploadOption = mdService.getUploadOption($scope.field, function (up, file, info) {
    var key = JSON.parse(info).key;
    var uploadedUrl = Configs.UPLOAD_DOMAIN + '/' + key
    var path = key.split('/');
    var filename = path[path.length - 1];
    var str = '![' + filename + '](' + uploadedUrl + ')\n';
    var strPos = mdService.getCaretPos('input-' + $scope.field);
    var text = $scope.model[$scope.field] || '';
    $scope.model[$scope.field] = text.substring(0, strPos) + str + text.substring(strPos, text.length);
    $scope.$apply();
    mdService.setCaretPos('input-' + $scope.field, strPos + str.length);
  });
  var uploader;
  $http.get(Configs.API_BASE + '/uptoken').then(function (res) {
    uploadOption.uptoken = res.data.uptoken;
    uploader = new window.QiniuJsSDK().uploader(uploadOption);
  });
  function trustHtml(html) {
    return $sce.trustAsHtml(html);
  }
  $scope.preview = function () {
    $scope.html = trustHtml('');
    $http.post(Configs.API_BASE + '/blogs/markdown', {markdown: $scope.model[$scope.field]}).then(function (res) {
      $scope.html = trustHtml(res.data.html);
    });
  };
}).service('mdService', function (Configs) {

  this.getCaretPos = function (areaId) {
    var txtarea = document.getElementById(areaId);
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart === '0') ?
      "ff" : (document.selection ? "ie" : false ) );
    if (br === "ie") {
      txtarea.focus();
      var range = document.selection.createRange();
      range.moveStart ('character', -txtarea.value.length);
      strPos = range.text.length;
    } else if (br === "ff") {
      strPos = txtarea.selectionStart;
    }
    return strPos;

  };
  this.setCaretPos = function (areaId, pos) {
    var txtarea = document.getElementById(areaId);
    var scrollPos = txtarea.scrollTop;
    var br = ((txtarea.selectionStart || txtarea.selectionStart === 0) ?
      "ff" : (document.selection ? "ie" : false ) );
    if (br === "ie") {
      txtarea.focus();
      var range = document.selection.createRange();
      range.moveStart ('character', -txtarea.value.length);
      range.moveStart ('character', pos);
      range.moveEnd ('character', 0);
      range.select();
    }
    else if (br === "ff") {
      txtarea.selectionStart = pos;
      txtarea.selectionEnd = pos;
      txtarea.focus();
    }
    txtarea.scrollTop = scrollPos;
  };
  this.getUploadOption = function (field, callback) {
    return {
      runtimes: 'html5,html4',
      browse_button: 'btn-upload-' + field,
      get_new_uptoken: false,
      domain: Configs.UPLOAD_DOMAIN,
      max_retries: 3,
      dragdrop: true,
      drop_element: 'input-' + field,
      chunk_size: '4mb',
      auto_start: true,
      unique_names: false,
      save_key: false,
      init: {
        FileUploaded: callback,
        Error: function (up, err, errTip) {
          window.alert('上传失败\n' + err + '\n' + errTip);
        },
        Key: function(up, file) {
          var name = file.name.split('.');
          var ext = '.' + name.splice(name.length - 1);
          name = name.join('.');
          return Configs.UPLOAD_PREFIX + name + new Date().getMilliseconds() + ext;
        }
      }
    };

  };
});
