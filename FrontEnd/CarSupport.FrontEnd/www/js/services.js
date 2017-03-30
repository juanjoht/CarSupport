angular.module('app.services', [])

.factory('AppFactory', ["$http", '$q', function($http, $q) {

    var appContext = "http://localhost:1337";
    var loginLocal = function(entity) {
        var result = $http({
            method: "POST",
            data: entity,
            url: appContext + "/auth/process"
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

    return ({
        loginLocal: loginLocal
    });
}])

.service('BlankService', [function() {

}]);