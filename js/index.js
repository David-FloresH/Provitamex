
var app = angular.module("myApp", []);

// $.ajaxSetup({
//   headers: { 'Access-Control-Allow-Origin':'*' , 'accept':'application/json', 'Content-Type':'application/json'}
// });
// $.ajax({
//   method: 'GET',
//   jsonp: 'callback',
//   url: 'http://localhost:8081/orders',
//   contentType: "application/json; charset=utf-8",
//   dataType: 'json',
//   data: JSON.stringify({
//     status: "1",
//     orderDate: "",
//     warehouseId: "",
//   }),
//   beforeSend: function(xhr,settings){
//     //spinner show;
//   },
//   success: function(response){
//     console.log(response);
//   },
//   error: function(xhr,status,errorThrown) {
//     Swal.fire("Error", "Ha ocurrido un error.", "error");
//     console.log(status);
//   },
//   complete: function(xhr, status){

//   }
// });

app.controller("MainController", ['$scope', function($scope) {
    $scope.user = "";
    $scope.pass = "";
    $scope.getUsers = function () {
      if($scope.user != "" && $scope.pass != ""){
        console.log("send data");
        console.log($scope.user,$scope.pass);
      }
      else{
        Swal.fire("Error", "Favor de ingresar todos sus datos.", "error");
      }
    }
}]);
