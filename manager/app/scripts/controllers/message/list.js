'use strict';

angular.module('managerApp').controller('MessageListController', function (Message, Modal, Alert) {
  var vm = this;
  vm.messages = Message.query();
  vm.delete = function (message) {
    Modal.open('是否删除留言: "' + message.content + '"').then(function (confirm) {
      if (confirm) {
        Message.delete({id: message._id}).$promise.then(function () {
          Alert.show('删除留言成功');
          vm.comments = Message.query();
        })
      }
    });
  };
});
