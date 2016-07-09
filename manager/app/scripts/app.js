'use strict';

/**
 * @ngdoc overview
 * @name managerApp
 * @description
 * # managerApp
 *
 * Main module of the application.
 */
angular
  .module('managerApp', ['ui.router']);

angular.module('managerApp')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'views/home.html'
    });
    $stateProvider.state('blogList', {
      url: '/blogs',
      templateUrl: 'views/blog/list.html',
      controller: 'BlogListController as vm'
    });
    $stateProvider.state('blogEdit', {
      url: '/blogs/:blogId',
      templateUrl: 'views/blog/edit.html',
      controller: 'BlogEditController as vm'
    });
    $stateProvider.state('blogNew', {
      url: '/blogs/new',
      templateUrl: 'views/blog/edit.html',
      controller: 'BlogNewController as vm'
    });
    $stateProvider.state('commentList', {
      url: '/comments',
      templateUrl: 'views/comment/list.html',
      controller: 'CommentListController as vm'
    });
    $stateProvider.state('messageList', {
      url: '/messages',
      templateUrl: 'views/message/list.html',
      controller: 'MessageListController as vm'
    });
    $stateProvider.state('404', {
      url: '/404',
      templateUrl: '404.html'
    });
    $urlRouterProvider.when('', '/blogs');
    $urlRouterProvider.otherwise('/404');
  });
