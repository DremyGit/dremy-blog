'use strict';
angular.module('managerApp').controller('MenuController', function ($rootScope) {
  var vm = this;
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    vm.menus.forEach(function (menu) {
      menu.active = menu.regex.test(toState.url);
    });
  });
  vm.menus = [
    {name: '首页', url: '#/', regex: /^\/$/},
    {name: '文章管理', url: '#/blogs', regex: /^\/blogs/},
    {name: '评论管理', url: '#/comments', regex: /^\/comments/},
    {name: '留言管理', url: '#/messages', regex: /^\/messages/},
    {name: '分类管理', url: '#/categories', regex: /^\/categories/},
    {name: '标签管理', url: '#/tags', regex: /^\/tags/},
    {name: '作品管理', url: '#/works', regex: /^\/works/}
  ];
});
