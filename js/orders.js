
app.controller("Controller", ['$scope', function($scope) {
    
    
    $scope.OrderDetails = function (){
        $scope.orderId = "25cbb3a1-5985-48dc-8c79-bc4c7bdcdff1";
        GetOrderDetails($scope.orderId)

        console.log("holi se logró")
    }
}]);


function GetOrderDetails(orderId){
    $.ajaxSetup({
      headers: { 'Access-Control-Allow-Origin':'*' , 'accept':'application/json', 'Content-Type':'application/json'}
    })
    $.ajax({
      method: 'GET',
      jsonp: 'callback',
      url: 'http://localhost:8081/orders/'+orderId,
      dataType: 'json',
      beforeSend: function(xhr,settings){
        //spinner show;
      },
      success: function(response){
        console.log(response);
        scope.$apply();
      },
      error: function(xhr,status,errorThrown) {
        console.log("Error");
      },
      complete: function(xhr, status){
      }
        
      
    });
  }