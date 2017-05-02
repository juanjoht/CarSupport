angular.module('app.services', [])

.factory('AppFactory', ["$http", '$q', function($http, $q) {

    var appContext = "https://carsupportadmintest.azurewebsites.net/";
    //var appContext = "http://localhost:1337";
    var loginLocal = function(entity) {
        var result = $http({
            method: "POST",
            data: entity,
            url: appContext + "/auth/process"
        });
        return sendRequest(result);
    }
    var getParts = function() {
        var result = $http({
            method: "GET",
            url: appContext + "/part/index"
        });
        return sendRequest(result);
    }
    var getbreakDown = function(param) {
        var result = $http({
            method: "GET",
            url: appContext + "/Breakdown/findBy/" + param
        });
        return sendRequest(result);
    }

    var getbreakDownbyId = function(param) {
        var result = $http({
            method: "GET",
            url: appContext + "/Breakdown/findById/" + param
        });
        return sendRequest(result);
    }

    var getQuestion = function(param) {
        var result = $http({
            method: "GET",
            url: appContext + "/question/findBy/" + param
        });
        return sendRequest(result);
    }
    var getresponseOption = function(param) {
        var result = $http({
            method: "GET",
            url: appContext + "/Responseoption/index/" + param
        });
        return sendRequest(result);
    }
    var postResponses = function(entity) {
        var result = $http({
            method: "POST",
            url: appContext + "/Acceptanceparameter/index?param=" + entity
        });
        return sendRequest(result);
    }
    var getParameters = function(entity) {
        var result = $http({
            method: "GET",
            url: appContext + "/Acceptanceparameter/findBy?param=" + entity
        });
        return sendRequest(result);
    }

    var postBreakDownnUser = function(entity) {
        var result = $http({
            method: "POST",
            url: appContext + "/Breakdownxuser/add",
            data: entity
        });
        return sendRequest(result);
    }

    var getbreakDownUserbyId = function(param) {
        var result = $http({
            method: "GET",
            url: appContext + "/Breakdownxuser/findBy/" + param
        });
        return sendRequest(result);
    }




    //Función encargada de resolver una operación con error en el consumo del servicio
    function handleError(response) {
        if (!angular.isObject(response.data) || !response.data.message) {
            return $q.reject("An unknown error occurred.");
        }
        return $q.reject(response.data.message);
    }

    //Función encargada de resolver el resultado del consumo de un servicio
    function sendRequest(config) {
        var deferred = $q.defer();
        config.then(function(response) {
            deferred.resolve(response);
        }, function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
    }

    this.myData = [];

    setMyData = function(myData) {
        this.myData = myData;
    };

    getMyData = function() {
        return this.myData;
    };

    return ({
        loginLocal: loginLocal,
        getParts: getParts,
        getbreakDown: getbreakDown,
        getQuestion: getQuestion,
        getresponseOption: getresponseOption,
        postResponses: postResponses,
        setMyData: setMyData,
        getMyData: getMyData,
        getParameters: getParameters,
        getbreakDownbyId: getbreakDownbyId,
        postBreakDownnUser: postBreakDownnUser,
        getbreakDownUserbyId: getbreakDownUserbyId
    });
}])

.service('BlankService', [function() {

}]);