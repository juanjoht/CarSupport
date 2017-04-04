angular.module('app.routes', [])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('main', {
            url: '/main',
            templateUrl: 'templates/main.html',
            controller: 'mainCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'loginCtrl'
        })

        .state('menu', {
            url: '/menu',
            templateUrl: 'templates/menu.html',
            controller: 'menuCtrl'
        })

        .state('menu.home', {
            url: '/home',
            views: {
                'menu': {
                    templateUrl: 'templates/home.html',
                    controller: 'loginCtrl'
                }
            }
        })

        .state('menu.historyFailures', {
            url: '/history-failures',
            views: {
                'side-menu-content': {
                    templateUrl: 'templates/history-failures.html',
                    controller: 'historyFailuressCtrl'
                }
            }
        })

        .state('selectPart', {
            url: '/select-part',
            templateUrl: 'templates/select-part.html',
            controller: 'selectPartCtrl'
        })

        .state('tab', {
            url: '/frequent-faults',
            templateUrl: 'templates/frequent-faults.html',
            controller: 'frecuentFaultsCtrl'
        })

        .state('tab.music', {
            url: '/tab-music',
            views: {
                'tabMusic': {
                    templateUrl: 'templates/tab-music.html',
                    controller: 'MusicCtrl'
                }
            }
        })



        $urlRouterProvider.otherwise('/main')
    });