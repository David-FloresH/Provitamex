var app = angular.module("myApp", []);



app.controller("MainController", ['$scope', function($scope) {
    $scope.getUsers = function () {
      $.ajax({
        type: "GET",
        url: "https://api.bind.com.mx/api/Warehouses",
    
        // Request headers
        beforeSend: function(xhrObj) {
            xhrObj.setRequestHeader("Cache-Control", "no-cache");
            xhrObj.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImthcmVuMXw3MjE4MSIsIkludGVybmFsSUQiOiI1Njc0OWE5Yy04ZTdjLTQ4YTktYjkxYS0wMjkyN2U3MGY4MDIiLCJuYmYiOjE2MTkzOTc2ODUsImV4cCI6MTY1MDkzMzY4NSwiaWF0IjoxNjE5Mzk3Njg1LCJpc3MiOiJNaW5udF9Tb2x1dGlvbnNfU0FfREVfQ1YiLCJhdWQiOiJCaW5kX0VSUF9BUElfVXNlcnMifQ.wjhxCvaXIv6A0Y2ook8dPdGF7WOHqf-i_vzoDJPTxQg");
            },
        })
    .done(function (data) {
        alert("success");
    })
    .fail(function () {
        alert("error");
    });
      // console.log('Iam in');
      // var settings = {
      //   "url": "https://api.bind.com.mx/api/Warehouses",
      //   "dataType": "jsonp",
      //   "method": "GET",
      //   "timeout": 0,
      //   "headers": {
      //     "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImthcmVuMXw3MjE4MSIsIkludGVybmFsSUQiOiI1Njc0OWE5Yy04ZTdjLTQ4YTktYjkxYS0wMjkyN2U3MGY4MDIiLCJuYmYiOjE2MTkzOTc2ODUsImV4cCI6MTY1MDkzMzY4NSwiaWF0IjoxNjE5Mzk3Njg1LCJpc3MiOiJNaW5udF9Tb2x1dGlvbnNfU0FfREVfQ1YiLCJhdWQiOiJCaW5kX0VSUF9BUElfVXNlcnMifQ.wjhxCvaXIv6A0Y2ook8dPdGF7WOHqf-i_vzoDJPTxQg",
      //     "Cache-Control": "no-cache",
      //     "Access-Control-Allow-Origin":"https://192.168.0.2:443/"
      //   },
      // };
      
      // $.ajax(settings).done(function (response) {
      //   console.log(response);
      // });
      }
}]);
