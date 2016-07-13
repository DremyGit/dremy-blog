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
  .module('managerApp', ['ui.router', 'ui.bootstrap', 'ngResource']);

angular.module('managerApp')
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'views/home.html'
    });
    $stateProvider.state('blogList', {
      url: '/blogs',
      templateUrl: 'views/blog/list.html',
      controller: 'BlogListController as vm'
    });
    $stateProvider.state('blogNew', {
      url: '/blogs/new',
      templateUrl: 'views/blog/edit.html',
      controller: 'BlogEditController as vm'
    });
    $stateProvider.state('blogEdit', {
      url: '/blogs/:blogName',
      templateUrl: 'views/blog/edit.html',
      controller: 'BlogEditController as vm'
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
    $stateProvider.state('categoryList', {
      url: '/categories',
      templateUrl: 'views/category/list.html',
      controller: 'CategoryListController as vm'
    });
    $stateProvider.state('tagList', {
      url: '/tags',
      templateUrl: 'views/tag/list.html',
      controller: 'TagListController as vm'
    });
    $stateProvider.state('404', {
      url: '/404',
      templateUrl: '404.html'
    });
    $urlRouterProvider.when('', '/blogs');
    $urlRouterProvider.otherwise('/404');

    $httpProvider.interceptors.push('AuthHandler');
  });
