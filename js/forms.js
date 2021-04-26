var app = angular.module('myApp', []);

console.log("ya cargo");

app.controller('MainController', ['$scope', function($scope) {
    $scope.message = function () {
        console.log("I am in bro");
    }
  }]);