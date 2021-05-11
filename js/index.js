var app = angular.module("myApp", []);



app.controller("MainController", ['$scope', function($scope) {
    $scope.getUsers = function () {
      console.log("hola");
      }
}]);
