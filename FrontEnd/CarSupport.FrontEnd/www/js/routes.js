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
                'side-menu-content': {
                    templateUrl: 'templates/home.html',
                    controller: 'homeCtrl'
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

        .state('menu.historyMaintenance', {
            url: '/history-maintenance/',
            views: {
                'side-menu-content': {
                    templateUrl: 'templates/history-maintenance.html',
                    controller: 'historyMaintenanceCtrl'
                }
            }
        })

        .state('menu.registerMaintenance', {
            url: '/register-maintenance/',
            views: {
                'side-menu-content': {
                    templateUrl: 'templates/register-history.html',
                    controller: 'registerMaintenanceCtrl'
                }
            }
        })

        .state('menu.detailMaintenance', {
            url: '/detail-maintenance/:maintenanceId',
            views: {
                'side-menu-content': {
                    templateUrl: 'templates/detail-maintenance.html',
                    controller: 'detailMaintenanceCtrl'
                }
            }
        })

        .state('menu.settingNotifications', {
                url: '/setting-notifications/:maintenanceId',
                views: {
                    'side-menu-content': {
                        templateUrl: 'templates/setting-notifications.html',
                        controller: 'settingnotificationCtrl'
                    }
                }
            })
            .state('menu.detailTips', {
                url: '/detail-tips/',
                views: {
                    'side-menu-content': {
                        templateUrl: 'templates/detail-tips.html',
                        controller: 'detailTipsCtrl'
                    }
                }
            })
            .state('menu.tips', {
                url: '/tips/',
                views: {
                    'side-menu-content': {
                        templateUrl: 'templates/tips.html',
                        controller: 'tipsCtrl'
                    }
                }
            })
            .state('menu.initForum', {
                url: '/init-forum/',
                views: {
                    'side-menu-content': {
                        templateUrl: 'templates/init-forum.html',
                        controller: 'initForumCtrl'
                    }
                }
            })
            .state('menu.forum', {
                url: '/forum/',
                views: {
                    'side-menu-content': {
                        templateUrl: 'templates/forum.html',
                        controller: 'forumCtrl'
                    }
                }
            })
            .state('menu.detailForum', {
                url: '/detail-forum/',
                views: {
                    'side-menu-content': {
                        templateUrl: 'templates/detail-forum.html',
                        controller: 'detailForumCtrl'
                    }
                }
            })
            .state('registerUser', {
                url: '/register-user',
                templateUrl: 'templates/register-user.html',
                controller: 'registerUserCtrl'
            })
            .state('initRegisterAuto', {
                url: '/init-reg-auto',
                templateUrl: 'templates/init-auto.html',
                controller: 'initAutoCtrl'
            })
            .state('registerAuto', {
                url: '/register-auto',
                templateUrl: 'templates/register-auto.html',
                controller: 'registerAutoCtrl'
            })

        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/Profile.html',
            controller: 'ProfileController'
        })






        $urlRouterProvider.otherwise('/main')
    });