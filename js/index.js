

var app = angular.module("myApp", []);


app.controller("MainController", ['$scope', function($scope) {
    $scope.user = "";
    $scope.pass = "";
    $scope.getUsers = function () {
      if($scope.user == "manolo" && $scope.pass == "12345"){
        window.location.href="/html/menu.html";
      }
      else{
        Swal.fire("Error","Usuario o Clave incorrecto","warning");
      }
    }
}]);
