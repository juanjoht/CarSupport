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

        .state('menu.registerFault', {
            url: '/register-fault',
            views: {
                'side-menu-content': {
                    templateUrl: 'templates/register-fault.html',
                    controller: 'registerFaultCtrl'
                }
            }
        })

        .state('menu.tabs', {
            url: '/frequent-faults/:partId',
            views: {
                'side-menu-content': {
                    templateUrl: 'templates/frequent-faults.html',
                    controller: 'frecuentFaultsCtrl'
                }
            }
        })


        .state('menu.question', {
            url: '/questions/:partId',
            views: {
                'side-menu-content': {
                    templateUrl: 'templates/questions.html',
                    controller: 'questionCtrl'
                }
            }
        })

        .state('menu.resultPossibleFailures', {
            url: '/result-possible-faults/:responses',
            views: {
                'side-menu-content': {
                    templateUrl: 'templates/result-possible-faults.html',
                    controller: 'resultPossibleFailuresCtrl'
                }
            }
        })

        .state('menu.detailFaults', {
            url: '/detail-fault/:breakdownId/:History',
            views: {
                'side-menu-content': {
                    templateUrl: 'templates/detail-fault.html',
                    controller: 'detailFaultsCtrl'
                }
            }
        })






        $urlRouterProvider.otherwise('/main')
    });