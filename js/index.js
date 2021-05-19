
var app = angular.module("myApp", []);



app.controller("MainController", ['$scope', function($scope) {
    $scope.getUsers = function () {
      $.ajax({
        method: 'POST',
        jsonp: 'callback',
        url: 'http://localhost:8081/newclient',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        data: JSON.stringify({
          legalName: "TestUser",
          pricelistId: "4cda058c-2d0a-4635-a7b2-597de294afed",
          telephone: "6861880576",
          streetName: "Cagliari",
          exteriorNo: "2267",
          colonia: "Bilbao",
          zipCode: "21254" ,
          city: "Mexicali",
          state: "Baja California",
          interiorNo: "1"
        }),
        beforeSend: function(xhr,settings){
          //spinner show;
        },
        success: function(response){
          console.log(response);
        },
        error: function(xhr,status,errorThrown) {
          console.log("Error");
        },
        complete: function(xhr, status){
          //spinner hide;
        }
      });
      }
}]);
