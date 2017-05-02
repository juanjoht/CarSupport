angular.module('app.controllers', ['ionic-audio', 'app.services', 'LocalStorageModule'])

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

.controller('loginCtrl', ['$scope', 'localStorageService', '$stateParams', '$location', '$state', '$ionicPopup', '$ionicLoading', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName

    function($scope, localStorageService, $stateParams, $location, $state, $ionicPopup, $ionicLoading, AppFactory) {
        $scope.data = {
            username: '',
            password: '',
            isApp: true
        };

        $scope.show = function() {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function() {
            $ionicLoading.hide();
        };

        $scope.login = function() {
            $scope.show($ionicLoading);
            AppFactory.loginLocal($scope.data).then(function(response) {
                if (response.data.account) {
                    localStorageService.set("UserId", response.data.account.Id);
                    $scope.hide($ionicLoading);
                    $state.go('menu.home');
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: response.data.error
                    });
                    $scope.hide($ionicLoading);
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


.controller('historyFailuressCtrl', ['$scope', '$stateParams', 'localStorageService', '$state', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, localStorageService, $state, AppFactory) {
        $scope.bdownUser = [];
        var Id = localStorageService.get("UserId");
        AppFactory.getbreakDownUserbyId(Id).then(function(response) {
            $scope.bdownUser = response.data;
        });

        $scope.goto = function(toState, idFault, isHistory) {
            $state.go(toState, { breakdownId: idFault, History: isHistory })
        }
    }
])

.controller('selectPartCtrl', ['$scope', '$stateParams', '$state', '$ionicSideMenuDelegate', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, $ionicSideMenuDelegate) {

        var divs = '<div class="redhotspot" id="Llantas" style="position: absolute; z-index: 103; width: 1.667%; height: 3.472%; top: 81%; left: 42%;"></div>' +
            '<div class="redhotspot" id="Interior" style="position: absolute; z-index: 103; width: 1.667%; height: 3.472%; top: 47%; left: 42%;"></div>' +
            '<div class="redhotspot" id="Motor" style="position: absolute; z-index: 103; width: 1.667%; height: 3.472%; top: 60%; left: 25%;"></div>';
        $('.container-points').append(divs);

        $ionicSideMenuDelegate.canDragContent(false);

        function blink_hotspot() {
            $('.redhotspot').animate({ "opacity": '0.3' }, 'slow').animate({ 'opacity': '0.8' }, 'fast', function() { blink_hotspot(); });
        }


        blink_hotspot();


        $("#Llantas").LiteTooltip({
            textalign: "left",
            trigger: "hover",
            templatename: "BostonBlue",
            title: '<div class="template">' +
                '<p style="padding: 5px; font-size: 11px; line-height: 20px;">' +
                '<img onclick=goto("menu.tabs","2") src="img/allow.jpg" class="image-left" style="max-width: 75px; width: 100%;" />' +
                '</p>' +
                '</div>'
        });

        $("#Interior").LiteTooltip({
            textalign: "left",
            trigger: "hover",
            templatename: "BostonBlue",
            title: '<div class="template">' +
                '<p style="padding: 5px; font-size: 11px; line-height: 20px;">' +
                '<img onclick=goto("menu.tabs","1") src="img/interior-ford.jpg" class="image-left" style="max-width: 200px; width: 100%;" />' +
                '</p>' +
                '</div>'
        });

        $("#Motor").LiteTooltip({
            textalign: "left",
            trigger: "hover",
            templatename: "BostonBlue",
            title: '<div class="template">' +
                '<p style="padding: 5px; font-size: 11px; line-height: 20px;">' +
                '<img onclick=goto("menu.tabs","1") src="img/motor-ford.jpg" class="image-left" style="max-width: 200px; width: 100%;" />' +
                '</p>' +
                '</div>'
        });

        goto = function(toState, params) {
            $state.go(toState, { partId: parseInt(params) })
        }
        var points = $('.redhotspot');


    }
])

.controller('registerFaultCtrl', ['$scope', '$stateParams', 'MediaManager', '$state', "AppFactory", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, MediaManager, $state, AppFactory) {
        $scope.urlBack = "https://carsupportadmintest.azurewebsites.net/";
        $scope.Parts = [];
        AppFactory.getParts().then(function(response) {
            $scope.Parts = response.data;
        });

        $scope.goto = function(toState, param) {
            $state.go(toState, { partId: param })
        }

    }
])

.controller('frecuentFaultsCtrl', ['$scope', '$stateParams', '$state', 'MediaManager', "AppFactory", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, MediaManager, AppFactory) {
        var param = $stateParams.partId;
        $scope.urlBack = 'https://carsupportadmintest.azurewebsites.net/'
        $scope.breakdown = [];
        AppFactory.getbreakDown(param).then(function(response) {
            $scope.breakdown = response.data;
        });
        $scope.goto = function(toState, idFault) {
            $state.go(toState, { partId: param, breakdownId: idFault, History: true })
        }
    }
])

.controller('resultPossibleFailuresCtrl', ['$scope', '$rootScope', '$filter', '$stateParams', 'MediaManager', "AppFactory", // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $filter, $stateParams, MediaManager, AppFactory) {
        var responsesGet = $rootScope.respo;
        var param = responsesGet[0].IdPart;
        $scope.urlBack = "https://carsupportadmintest.azurewebsites.net/";
        $scope.partbreakDown = [];
        $scope.responsebreakDown = [];

        AppFactory.getbreakDown(param).then(function(breakdowns) {
            $scope.breakdown = [];
            $scope.partbreakDown = breakdowns.data;
            angular.forEach($scope.partbreakDown, function(x, key1) {
                AppFactory.getParameters(x.Id).then(function(accept) {
                    angular.forEach(responsesGet, function(y, key2) {
                        var tmp = $filter("filter")(accept.data, { Question: y.IdQuestion }, true);
                        if (tmp.length != 0) {
                            var q = $filter("filter")(tmp, { Responseoption: y.IdOption }, true);
                            if (q.length != 0) {
                                var bExist = $filter("filter")($scope.breakdown, { Id: x.Id }, true);
                                if (bExist.length == 0) {
                                    $scope.breakdown.push(x);
                                }
                            } else {
                                //borrar slice
                            }
                        };
                    });
                });
            });
        });
    }
])

.controller('questionCtrl', ['$scope', '$rootScope', '$filter', '$stateParams', '$state', '$ionicPopup', 'MediaManager', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $filter, $stateParams, $state, $ionicPopup, MediaManager, AppFactory) {
        var partId = $stateParams.partId;
        $scope.questions = [];
        $scope.questionNumbers = [];
        $scope.responseoptions = [];
        $scope.questionName = '';
        $scope.showFinish = false;
        $scope.urlprefix = "https://carsupportadmintest.azurewebsites.net/";
        $scope.responsePost = [];
        $scope.respose = '';
        $scope.choice = '';

        $scope.setResponse = function(oId, qId, oDesc) {
            var tmp = $filter("filter")($scope.responsePost, { IdQuestion: qId }, true);
            if (tmp.length == 0) {
                $scope.responsePost.push({ IdPart: partId, IdQuestion: qId, IdOption: oId, choiceOption: oDesc });
            } else {
                $scope.responsePost[$scope.cClass - 1].IdOption = oId;
                $scope.responsePost[$scope.cClass - 1].choiceOption = oDesc;
            }
        };
        $scope.sendResponses = function(toState) {
            //  AppFactory.setMyData($scope.responsePost);
            $rootScope.respo = $scope.responsePost;
            $state.go(toState)
        }

        //Se obtiene el numero de   preguntas
        AppFactory.getQuestion(partId).then(function(question) {
            $scope.questions = question.data;
            angular.forEach($scope.questions, function(value, key) {
                if (key + 1 == 1) {
                    $scope.questionName = value.Description;
                    $scope.questionId = value.Id;
                    this.push({ id: value.Id, description: value.Description, text: key + 1, button: true, positive: true, inline: true, outline: false });
                    AppFactory.getresponseOption(value.Id).then(function(response) {
                        angular.forEach(response.data, function(value, key) {
                            $scope.responseoptions.push({ Id: value.Id, Description: value.Description, Path: value.Path, OptionType: value.OptionType, check: true })
                        });
                        $scope.dataFirstTab($scope.responseoptions[0].OptionType);
                    });
                } else {
                    this.push({ id: value.Id, description: value.Description, text: key + 1, button: true, positive: true, inline: true, outline: true });
                }
                if (key == question.data.length) {
                    $scope.showFinish = true;
                } else {
                    $scope.showFinish = false;
                }
            }, $scope.questionNumbers);



        });
        $scope.dataFirstTab = function(valueTemplate) {
            $scope.currentTpl = '/tp' + valueTemplate + '.html';
            $scope.cClass = 1;
        }



        $scope.showContent = function(event, index, isnext, idQuestion, qName) {
            var tmp = $filter("filter")($scope.responsePost, { IdQuestion: $scope.questionId }, true);
            if (tmp.length != 0) {
                AppFactory.getresponseOption(idQuestion).then(function(response) {
                    $scope.questionName = qName;
                    $scope.questionId = idQuestion;
                    $scope.responseoptions = response.data;
                    $scope.currentTpl = '/tp' + response.data[0].OptionType + '.html';
                    if (response.data[0].OptionType == '2') {
                        $scope.setTracks(response.data)
                    }
                });
                var tmpPrev = $filter("filter")($scope.questionNumbers, { text: parseInt($scope.cClass.toString()) }, true)
                tmpPrev[0].outline = true;
                var e = event.currentTarget.innerText;
                if (isnext) {
                    e = index.toString();
                }
                var tmpCurrent = $filter("filter")($scope.questionNumbers, { text: parseInt(e) }, true)
                tmpCurrent[0].outline = false;
                $scope.cClass = index;

                if (typeof $scope.responsePost[index - 1] != 'undefined') {
                    $scope.choice = $scope.responsePost[index - 1].choiceOption;
                }

                if (index == $scope.questionNumbers.length) {
                    $scope.showFinish = true;
                } else {
                    $scope.showFinish = false;
                }
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                    template: 'Por favor seleccione una respuesta para continuar!'
                });
            }
        }



        $scope.setTracks = function(data) {
            $scope.tracks = [];
            $scope.dynamicTrack = {};
            angular.forEach(data, function(value, key) {
                this.push({ Id: value.Id, url: $scope.urlprefix + value.Path, artist: 'Admin', title: value.Description })
            }, $scope.tracks);
            $scope.stopPlayback = function() {
                MediaManager.stop();
            };
            $scope.playTrack = function(index) {
                $scope.dynamicTrack = $scope.tracks[index];

                $scope.togglePlayback = !$scope.togglePlayback;
            };
        }


        $scope.data = {
            isLoading: false
        };


        $scope.questionContent = [
            { title: 'pregunta 1', },
            { title: 'pregunta 2', }
        ]
    }
])

.controller('detailFaultsCtrl', ['$scope', 'localStorageService', '$stateParams', '$state', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, localStorageService, $stateParams, $state, AppFactory) {
        var param = $stateParams.breakdownId;

        $scope.paramHistory = eval($stateParams.History);

        $scope.urlprefix = "https://carsupportadmintest.azurewebsites.net/";
        $scope.name = '';
        $scope.cause = '';
        $scope.consequenses = '';
        $scope.solutions = '';
        $scope.PathImage = '';
        $scope.autoRepairs = [];
        $scope.breakdownDetail = [];
        AppFactory.getbreakDownbyId(param).then(function(response) {
            $scope.name = response.data.Name;
            $scope.cause = response.data.Causes;
            $scope.consequenses = response.data.Consequences;
            $scope.solutions = response.data.Solutions;
            $scope.pathImage = response.data.PathImage;
            $scope.autoRepairs = response.data.AutoRepairs;
        });



        $scope.addBreakDownUser = function() {
            var entity = {
                Id: 0,
                Breakdown: parseInt($stateParams.breakdownId),
                User: localStorageService.get("UserId")
            }
            AppFactory.postBreakDownnUser(entity).then(function(response) {
                if (response.data) {
                    $state.go('menu.historyFailures');
                }
            });
        }




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