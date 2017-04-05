angular.module('app.controllers', ['ionic-audio', 'app.services', ])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('mainCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('loginCtrl', ['$scope', '$stateParams', '$location', '$state', '$ionicPopup', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName

    function($scope, $stateParams, $location, $state, $ionicPopup, AppFactory) {
        $scope.data = {
            username: '',
            password: '',
            isApp: true
        };

        $scope.login = function() {
            //$state.go('menu.home');
            AppFactory.loginLocal($scope.data).then(function(response) {
                if (response.data.account) {
                    $state.go('menu.home');
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: response.data.error
                    });
                }
            });
        }
    }
])

.controller('homeCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])


.controller('historyFailuressCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('selectPartCtrl', ['$scope', '$stateParams', '$state', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, $ionicSideMenuDelegate) {

        $ionicSideMenuDelegate.canDragContent(false);

        function blink_hotspot() {
            $('.redhotspot').animate({ "opacity": '0.3' }, 'slow').animate({ 'opacity': '0.8' }, 'fast', function() { blink_hotspot(); });
        }


        blink_hotspot();


        $("#fhotspot1").LiteTooltip({
            textalign: "left",
            trigger: "hover",
            templatename: "BostonBlue",
            title: '<div class="template">' +
                '<p style="padding: 5px; font-size: 11px; line-height: 20px;">' +
                '<img onclick=goto("menu.tabs") src="img/allow.jpg" class="image-left" style="max-width: 75px; width: 100%;" />' +
                '</p>' +
                '</div>'
        });

        $("#fhotspot2").LiteTooltip({
            textalign: "left",
            trigger: "hover",
            templatename: "BostonBlue",
            title: '<div class="template">' +
                '<p style="padding: 5px; font-size: 11px; line-height: 20px;">' +
                '<img onclick=goto("menu.tabs") src="img/interior-ford.jpg" class="image-left" style="max-width: 200px; width: 100%;" />' +
                '</p>' +
                '</div>'
        });

        goto = function(toState, params) {
            $state.go(toState, params)
        }
    }
])

.controller('frecuentFaultsCtrl', ['$scope', '$stateParams', 'MediaManager', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, MediaManager) {
        var urlprefix = '/android_asset/www/audio/';

        $scope.dynamicTrack = {};

        $scope.tracks = [{
                url: urlprefix + '03 - Land Of Confusion.mp3',
                artist: 'Genesis',
                title: 'Land of Confusion'
            },
            {
                url: urlprefix + '02 - Tonight. Tonight. Tonight.mp3',
                artist: 'Genesis',
                title: 'Tonight. Tonight. Tonight'
            }
        ];

        $scope.stopPlayback = function() {
            MediaManager.stop();
        };
        $scope.playTrack = function(index) {
            $scope.dynamicTrack = $scope.tracks[index];

            $scope.togglePlayback = !$scope.togglePlayback;
        };

    }
])

.controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [
        { title: 'Reggae', id: 1 },
        { title: 'Chill', id: 2 },
        { title: 'Dubstep', id: 3 },
        { title: 'Indie', id: 4 },
        { title: 'Rap', id: 5 },
        { title: 'Cowbell', id: 6 }
    ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {});