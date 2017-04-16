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

        .state('menu.selectPart', {
            url: '/select-part',
            views: {
                'side-menu-content': {
                    templateUrl: 'templates/select-part.html',
                    controller: 'selectPartCtrl'
                }
            }
        })

        .state('menu.tabs', {
            url: '/frequent-faults',
            views: {
                'side-menu-content': {
                    templateUrl: 'templates/frequent-faults.html',
                    controller: 'frecuentFaultsCtrl'
                }
            }
        })


        .state('menu.question', {
            url: '/questions',
            views: {
                'side-menu-content': {
                    templateUrl: 'templates/questions.html',
                    controller: 'questionCtrl'
                }
            }
        })





        $urlRouterProvider.otherwise('/main')
    });