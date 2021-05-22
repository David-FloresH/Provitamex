
var app = angular.module("myApp", []);

app.controller("MainController", ['$scope', function($scope) {
    $scope.user = "";
    $scope.pass = "";
    $scope.getUsers = function () {
      if($scope.user != "" && $scope.pass != ""){
        console.log("send data");
        console.log($scope.user,$scope.pass);
      }
      else{
        Swal.fire("Error", "Favor de ingresar todos sus datos.", "Error");
      }
    }
}]);
