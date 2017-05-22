angular.module('app.controllers', ['ionic-audio', 'app.services', 'LocalStorageModule', 'ngCordova', 'ngStorage', 'ngMessages'])

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

.controller('loginCtrl', ['$scope', 'localStorageService', '$stateParams', '$location', '$state', '$ionicPopup', '$ionicLoading', '$cordovaOauth', '$localStorage', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName

    function($scope, localStorageService, $stateParams, $location, $state, $ionicPopup, $ionicLoading, $cordovaOauth, $localStorage, AppFactory) {
        $scope.data = {
            username: '',
            password: '',
            isApp: true
        };

        $scope.show = function() {
            $ionicLoading.show({
                template: '<p>Cargando...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function() {
            $ionicLoading.hide();
        };

        $scope.login = function() {
            $scope.show($ionicLoading);
            AppFactory.loginLocal($scope.data).then(function(response) {
                if (response.data.account) {
                    localStorageService.set("Nombre", response.data.account.FullName);
                    localStorageService.set("UserId", response.data.account.Id);
                    localStorageService.set("loginType", 'local');
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

        $scope.loginFacebook = function() {
            $cordovaOauth.facebook("165019570694513", ["email", "user_posts", "user_website", "user_location", "user_relationships"]).then(function(result) {
                $localStorage.accessToken = result.access_token;
                $localStorage.rs = 'fb';
                localStorageService.set("loginType", 'fb');
                $location.path("/menu");
            }, function(error) {
                alert("There was a problem signing in!  See the console for logs");
                console.log(error);
            });
        };

        $scope.LoginwithGoogle = function() {
            $ionicLoading.show({
                template: 'Logging in...'
            });

            window.plugins.googleplus.login({},
                function(user_data) {
                    // For the purpose of this example I will store user data on local storage
                    AppFactory.setUser({
                        userID: user_data.userId,
                        name: user_data.displayName,
                        email: user_data.email,
                        picture: user_data.imageUrl,
                        accessToken: user_data.accessToken,
                        idToken: user_data.idToken
                    });

                    $ionicLoading.hide();
                    $state.go('home');
                },
                function(msg) {
                    $ionicLoading.hide();
                }
            );
        };


    }
])

.controller('menuCtrl', ['$scope', '$rootScope', '$http', '$stateParams', '$location', '$localStorage', '$state', 'localStorageService', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $http, $stateParams, $location, $localStorage, $state, localStorageService, AppFactory) {
        $scope.init = function() {
            $scope.profileData = ''
            var ty = localStorageService.get("loginType");

            if (ty == 'local') {
                $scope.profileData = {
                    name: localStorageService.get("Nombre")
                }
                $scope.showImage = true;
            } else if ($localStorage.hasOwnProperty("accessToken") === true) {
                $http.get("https://graph.facebook.com/v2.2/me", {
                    params: {
                        access_token: $localStorage.accessToken,
                        fields: "id,name,gender,email,location,website,picture,relationship_status",
                        format: "json"
                    }
                }).then(function(result) {
                        $scope.profileData = result.data;
                        $scope.addUserFb(result.data);
                        $state.go('menu.home');
                    },
                    function(error) {
                        alert("There was a problem getting your profile.  Check the logs for details.");
                    });
            }
        };

        $scope.logout = function() {
            var type = localStorageService.get("loginType");
            if (type == 'local') {
                AppFactory.logoutLocal().then(function(resp) {
                    if (resp) {
                        localStorageService.clearAll();
                        $state.go('login');
                    }
                });
            } else {
                delete $localStorage.accessToken;
                $location.path("/login");
            }
        }

        $scope.addUserFb = function(profile) {
            AppFactory.getUserbyId(profile.id).then(function(resp) {
                if (resp.data.length == 0) {
                    $scope.user = {
                        Id: 0,
                        IdentificationNumber: profile.id,
                        FullName: profile.name,
                        Email: profile.email,
                        Username: profile.email,
                        Password: 'fb'
                    };
                    AppFactory.postUser($scope.user).then(function(response) {
                        $scope.response = response;
                        localStorageService.set("UserId", response.data.Id);
                    });
                } else {
                    $scope.dt = resp.data[0].Id;
                    localStorageService.set("UserId", resp.data[0].Id);
                }
            });
        }
    }
])

.controller('homeCtrl', ['$scope', '$rootScope', '$stateParams', 'localStorageService', '$state', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $rootScope, $stateParams, localStorageService, $state, AppFactory) {
        var Id = localStorageService.get("UserId");
        $scope.urlBack = "https://carsupportadmintest.azurewebsites.net/";
        $scope.Cars = [];
        AppFactory.getCarbyId(Id).then(function(response) {
            $scope.Cars = response.data;
        });

        $scope.goto = function(toState) {
            $state.go(toState)
        }


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

.controller('detailFaultsCtrl', ['$scope', 'localStorageService', '$stateParams', '$state', '$ionicPopup', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, localStorageService, $stateParams, $state, $ionicPopup, AppFactory) {
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
            AppFactory.getBreakdownbyUserFail(entity).then(function(response) {
                if (response.data.length == 0) {
                    AppFactory.postBreakDownnUser(entity).then(function(response) {
                        if (response.data) {
                            $state.go('menu.historyFailures');
                        }
                    });
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Error',
                        template: 'Ya se encuentra ingresada la falla en el historial del usuario'
                    });
                    $state.go('menu.historyFailures');
                }
            });




        }




    }
])

.controller('historyMaintenanceCtrl', ['$scope', 'localStorageService', '$stateParams', '$state', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, localStorageService, $stateParams, $state, AppFactory) {

        $scope.MaintUser = [];
        var Id = localStorageService.get("UserId");
        AppFactory.getMaintenanceUserbyId(Id).then(function(response) {
            $scope.MaintUser = response.data;
        });


        $scope.goto = function(toState, idMaintenance) {
            $state.go(toState, { maintenanceId: idMaintenance });
        }
    }
])

.controller('registerMaintenanceCtrl', ['$scope', 'localStorageService', '$stateParams', '$state', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, localStorageService, $stateParams, $state, AppFactory) {
        var Id = localStorageService.get("UserId");
        $scope.Maintenances = '';
        AppFactory.getMaintenances(Id).then(function(response) {
            $scope.Maintenances = response.data;
        });


        $scope.goto = function(toState, idMaintenance) {
            $state.go(toState, { maintenanceId: idMaintenance });
        }
    }
])

.controller('detailMaintenanceCtrl', ['$scope', '$stateParams', '$state', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, AppFactory) {
        var param = parseInt($stateParams.maintenanceId);

        $scope.name = '';
        $scope.procedure = '';
        $scope.lastChangeDate = '';
        $scope.nextChangeDate = '';
        $scope.place = '';
        AppFactory.getDetailMaintenanceUserbyId(param).then(function(response) {
            $scope.name = response.data[0].Maintenance.Description;
            $scope.procedure = response.data[0].Maintenance.Procedure;
            $scope.lastChangeDate = response.data[0].LastChangeDate;
            $scope.nextChangeDate = response.data[0].NextChangeDate;
            $scope.place = response.data[0].PlaceChange;
        });
    }
])

.controller('settingnotificationCtrl', ['$scope', 'localStorageService', '$stateParams', '$state', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, localStorageService, $stateParams, $state, AppFactory) {
        var param = parseInt($stateParams.maintenanceId);
        var userId = localStorageService.get("UserId");

        $scope.dateValue = '';
        $scope.newDate = ''
        $scope.monthAdd = '';
        $scope.Name = '';
        AppFactory.getMaintenancebyId(param).then(function(response) {
            $scope.Name = response.data[0].Description;
            $scope.monthAdd = response.data[0].TimeChange;
        });

        addMonthsUTC = function(date, count) {
            if (date && count) {
                var m, d = (date = new Date(+date)).getUTCDate()

                date.setUTCMonth(date.getUTCMonth() + count, 1)
                m = date.getUTCMonth()
                date.setUTCDate(d)
                if (date.getUTCMonth() !== m) date.setUTCDate(0)
            }
            return date
        }

        convertUTCDateToLocalDate = function(date) {
            var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
            return newDate;
        }
        var dateA = '';
        var dateD = '';
        $scope.selectDate = function() {
            $scope.dateValue = new Date(document.getElementById("dateLastChange").value);

            var d = addMonthsUTC($scope.dateValue, parseInt($scope.monthAdd));
            var a = addMonthsUTC($scope.dateValue.setDate($scope.dateValue.getDate() - 1), parseInt($scope.monthAdd));
            dateD = convertUTCDateToLocalDate(d);
            $scope.newDate = dateD.toLocaleDateString();
            dateA = convertUTCDateToLocalDate(a);

        }
        $scope.AddMaintenanceUser = function() {
            var parameters = {
                Id: 0,
                notificationDate: dateA,
                NextChangeDate: dateD,
                LastChangeDate: $scope.dateValue,
                PlaceChange: document.getElementById("txtPlace").value,
                UserId: userId,
                MaintenanceId: param
            }
            AppFactory.postmaintenanceUser(parameters).then(function(response) {
                $state.go('menu.historyMaintenance');
            });
        }
    }
])

.controller('detailTipsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {

    }
])

.controller('tipsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {

    }
])

.controller('initForumCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {

    }
])

.controller('forumCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {

    }
])

.controller('detailForumCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {

    }
])

.controller('registerUserCtrl', ['$scope', '$stateParams', '$state', 'localStorageService', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, localStorageService, AppFactory) {
        $scope.user = {
            Id: 0,
            IdentificationNumber: '',
            FullName: '',
            Email: '',
            Username: '',
            Password: ''
        };
        $scope.AddUser = function(form) {
            if (form.$valid) {
                AppFactory.postUser($scope.user).then(function(response) {
                    localStorageService.set("UserId", response.data.Id);
                    $state.go('initRegisterAuto');
                });

            }
        };
    }
])

.controller('initAutoCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {

    }
])

.controller('registerAutoCtrl', ['$scope', 'localStorageService', '$stateParams', '$state', 'AppFactory', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, localStorageService, $stateParams, $state, AppFactory) {
        var Brands = []
        var Models = []
        $scope.IdUser = localStorageService.get("UserId");
        $scope.IdBrand = '';
        $scope.IdModel = '';
        $scope.data = {
            Id: 0,
            LicensePlate: '',
            Year: '',
            CurrentMileage: '',
            FuelType: '',
            Class: '',
            ModelId: 0,
            UserId: $scope.IdUser,
            BrandId: 0
        }
        AppFactory.getBrand().then(function(response) {
            $scope.Brands = response.data;
        });

        $scope.getModels = function(IdBrand) {
            AppFactory.getModelbyIdBrand(IdBrand).then(function(response) {
                $scope.Models = response.data;
            });
        }

        $scope.SaveCar = function() {
            AppFactory.postCar($scope.data).then(function(response) {
                $state.go('menu.home');
            });
        }



    }
])