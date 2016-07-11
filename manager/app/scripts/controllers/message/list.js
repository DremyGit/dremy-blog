'use strict';

angular.module('managerApp').controller('MessageListController', function (Message) {
  var vm = this;
  //vm.messages = [{"_id":"5732d5142aaa81dc0435da77","blog":"57301d8789d0867808ed502a","content":"test comment 1","email":"123@123.com","user":"test1","replies":[],"support_count":1,"create_at":"2016-05-11T06:45:40.488Z"}];
  vm.messages = Message.query();
});
