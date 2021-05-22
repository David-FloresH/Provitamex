

console.log("inicio");
let newProductID = "";
let newProductInventory = "";
let newProductPrice = "";
// $.ajax({
//   method: 'POST',
//   jsonp: 'callback',
//   url: 'http://localhost:8081/newclient',
//   contentType: "application/json; charset=utf-8",
//   dataType: 'json',
//   data: JSON.stringify({
//     legalName: "TestUser",
//     pricelistId: "4cda058c-2d0a-4635-a7b2-597de294afed",
//     telephone: "6861880576",
//     streetName: "Cagliari",
//     exteriorNo: "2267",
//     colonia: "Bilbao",
//     zipCode: "21254" ,
//     city: "Mexicali",
//     state: "Baja California",
//     interiorNo: "1"
//   }),
//   beforeSend: function(xhr,settings){
//     //spinner show;
//   },
//   success: function(response){
//     console.log(response);
//   },
//   error: function(xhr,status,errorThrown) {
//     console.log("Error");
//   },
//   complete: function(xhr, status){
//     //spinner hide;
//   }
// });

var app = angular.module("myApp", []);
var scope;

window.onload = function(){
  scope = angular.element($('#scope')).scope();
}

app.controller("MainController", ['$scope', function($scope) {
    $scope.options = ["Calendario","Registro de Pedido","Nuevo Cliente", "Consultas de Información"];
    $scope.pricelist = {
      Público : "f706d48f-1c23-4d4b-8f37-afb803e394a9",
      Mayoreo : "d280c8ee-6226-4cb3-9005-05f3658d4c42",
    }
    
    $scope.showForm = false;
    $scope.showCompletedForm = false;
    $scope.showCalendar = true;
    $scope.showLoading = false;
    $scope.showLoadingModal = false;
    $scope.warehouseChanged = false;
    $scope.startingTime = "";
    $scope.finishingTime = "";
    $scope.startingDate = "";
    $scope.findClient = "";
    $scope.clientAddress = "";
    $scope.addedProduct = "";
    $scope.clientPhone = "";
    $scope.priceListID = "";
    $scope.clientList = [];
    $scope.warehousesList = [];
    $scope.clientListNames = [];
    $scope.selectedProducts = [];
    $scope.completeProductList = [];

    $scope.NewClientInputMobile = {
      NewClientName : "",  
      SelectedPriceList:  "", 
      NewClientTelephone: "" , 
      NewClientStreet: "", 
      NewClientExtNumber : "",  
      NewClientNeighborhood:"", 
      NewClientZipCode:"",
      NewClientCity: "", 
      NewClientState:"", 
      NewClientIntNumber: "" 
  };
    $scope.filterContent = function() {
       let optionPos = $scope.options.indexOf($scope.selectedOption);
       console.log(optionPos);
       switch (optionPos) {
           case 0:
                $scope.showCalendar = true;
                $scope.showForm = false;
                $scope.showCompletedForm = false;
                $scope.showNewClient = false; 
                break;
            
            case 1:
                $scope.showCalendar = false;
                $scope.showLoading = true;
                $scope.showForm = false;
                $scope.showCompletedForm = false;
                $scope.showNewClient = false;
                searchClientName();
                break;
            case 2:
              $scope.showCalendar = false;
              $scope.showForm = false;
              $scope.showCompletedForm = false;
              $scope.showNewClient = true; 
       }
    };

    $scope.searchClient = function (){
      $scope.showForm = false;
      $scope.showCompletedForm = true;
        $scope.showForm = false;
        $scope.showLoading = true;
        $scope.indexID = '';
        $scope.clientName = document.getElementById("clientInput").value;
        $scope.clientList.forEach(function(element,index,arr){
          if(arr[index].clientName == $scope.clientName){
            $scope.indexID = arr[index].id;
          }
        });
        $scope.warehousesNames = [];
        getCompletedFormInfo();
    }
    
    $scope.changeClient = function(){
        $scope.showForm = true;
        $scope.showCompletedForm = false;
        $scope.clientName = "";
        let clientListNames = [];
        scope.clientList.forEach(function(element,index){
          clientListNames[index] = element.clientName;
        });
        autocomplete(document.getElementById('clientInput'),clientListNames);
    }

    $scope.addProducts = function(){
      console.log($scope.selectedProducts);
      console.log(document.getElementById("autocompleteProducts").value);
      if(($scope.selectedProducts.findIndex(element => element.title == document.getElementById("autocompleteProducts").value)) == -1){
        $scope.completeProductList.forEach(function(element){
          if(element.title == document.getElementById("autocompleteProducts").value){
            newProductID = element.id;
            newProductInventory = parseInt(element.inventory);
            newProductPrice = element.price;
          }
        })
        $scope.selectedProducts.unshift({
          id: newProductID,
          title: document.getElementById("autocompleteProducts").value,
          qty: 1,
          price: newProductPrice,
          inventory: newProductInventory
        });
        document.getElementById("autocompleteProducts").value = "";
        $scope.addedProduct = '';
      }
      else{
        Swal.fire("Error", "Producto ya agregado.", "error");
        document.getElementById("autocompleteProducts").value = "";
      }
      
    }

    $scope.increase = function(index){
      console.log($scope.selectedProducts[index].qty);
      console.log($scope.selectedProducts[index].inventory);
      if($scope.selectedProducts[index].qty < $scope.selectedProducts[index].inventory){
        $scope.selectedProducts[index].qty += 1;
      }
    }

    $scope.decrease = function(index){
      if($scope.selectedProducts[index].qty == 1){
        console.log("I am in");
      }
      else{
        $scope.selectedProducts[index].qty -= 1;
      }
    }

    $scope.delete = function(index){
      $scope.selectedProducts.splice(index,1);
    }

    $scope.sendForm = function(){
      $scope.totalSale = 0;
      $scope.selectedProducts.forEach(product => {
        $scope.totalSale += (parseFloat(product.qty*product.price));
      })
      $('#staticBackdrop').modal('show');
      sendNewOrder();
      console.log("enviar");
    }

    $scope.finishOrder = function(){
      $('#staticBackdrop').modal('hide');
      document.getElementById("clientInput").value = "";
      $scope.showCompletedForm = false;
      $scope.showForm = true;
      Swal.fire("Orden Exitosa!", "Se ha registrado la orden correctamente.", "success");
    }

    $scope.changeWarehouse = function(warehouse){
      $scope.locationID = warehouse.locationID;
      $scope.warehouseID = warehouse.id;
      console.log(warehouse);
      $scope.warehouseChanged = true;
      getProductList(warehouse);
    }

    $scope.NewClient = function(){
      $scope.NewClientInputPC = {
        NewClientName: "",  
        SelectedPriceList:  "", 
        NewClientTelephone: "" , 
        NewClientStreet: "", 
        NewClientExtNumber : "",  
        NewClientNeighborhood:"", 
        NewClientZipCode:"",
        NewClientCity: "", 
        NewClientState:"", 
        NewClientIntNumber: ""   
        };

       
    }
    
    $scope.RegisterNewClient = function (){
      validate($scope.NewClientInputMobile);
    }

    $scope.RegisterNewClient2 = function (){
     validate($scope.NewClientInputPC)
    }
    
}]);


function validate (clientInput)
{
  console.log(clientInput);
  let valid = true; 

  for(let property in clientInput)
  {
   if ( clientInput[property] == "" )
      {
        valid = false;
        break; 
      }
  }
    console.log(valid)
    if (valid == true)
    {
      NewClientRequest(clientInput); 
      scope.showLoadingModal = true; 
      scope.showLoading = true; 
      scope.$apply();
    }else {
      Swal.fire("Error", "Llenar la forma completa", "error");
    }
}


function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }

function getCompletedFormInfo() {
    $.ajaxSetup({
      headers: { 'Access-Control-Allow-Origin':'*' , 'accept':'application/json', 'Content-Type':'application/json'}
    });
    $.ajax({
      method: 'GET',
      jsonp: 'callback',
      url: 'http://localhost:8081/clients/'+scope.indexID,
      dataType: 'json',
      beforeSend: function(xhr,settings){
        
      },
      success: function(response){
        console.log(response);
        scope.clientPhone = response.telephones;
        scope.clientAddress = response.addresses[0];
        scope.priceListID = response.priceListID;
        scope.$apply();
      },
      error: function(xhr,status,errorThrown) {
        console.log("Error");
      },
      complete: function(xhr, status){
        $('.datepickerD').datepicker({
          dateFormat: 'dd-mm-yy'
        });
        console.log("init");
        $('.timepicker').timepicker({
          timeFormat: 'h:mm p',
          interval: 60,
          minTime: '10',
          maxTime: '6:00pm',
          defaultTime: '11',
          startTime: '10:00',
          dynamic: false,
          dropdown: true,
          scrollbar: true
        });
      }
    });
  
    $.ajaxSetup({
      headers: { 'Access-Control-Allow-Origin':'*' , 'accept':'application/json', 'Content-Type':'application/json'}
    })
    $.ajax({
      method: 'GET',
      jsonp: 'callback',
      url: 'http://localhost:8081/warehouses',
      dataType: 'json',
      beforeSend: function(xhr,settings){
        //spinner show;
      },
      success: function(response){
        console.log(response);
        scope.warehousesList = response;
      },
      error: function(xhr,status,errorThrown) {
        console.log("Error");
      },
      complete: function(xhr, status){
        console.log('complete in');
        scope.showCompletedForm = true;
        scope.showLoading = false;
        scope.$apply();
      }
    });
  }

function searchClientName(){
  $.ajaxSetup({
    headers: { 'Access-Control-Allow-Origin':'*' , 'accept':'application/json', 'Content-Type':'application/json'}
  })
  $.ajax({
    method: 'GET',
    jsonp: 'callback',
    url: 'http://localhost:8081/clients',
    dataType: 'json',
    beforeSend: function(xhr,settings){
      //spinner show;
    },
    success: function(response){
      console.log(response);
      scope.clientList = response;
      console.log(scope.clientList);
      scope.showForm = true;
      scope.showLoading = false;
      scope.$apply();
    },
    error: function(xhr,status,errorThrown) {
      console.log("Error");
    },
    complete: function(xhr, status){
      let clientListNames = [];
      scope.clientList.forEach(function(element,index){
        clientListNames[index] = element.clientName;
      });
      console.log(clientListNames);     
      autocomplete(document.getElementById('clientInput'),clientListNames);
    }
  });
}

function getProductList(warehouse) {
  let inventoryProducts = [];
  $.ajaxSetup({
    headers: { 'Access-Control-Allow-Origin':'*' , 'accept':'application/json', 'Content-Type':'application/json'}
  });
  $.ajax({
    method: 'GET',
    jsonp: 'callback',
    url: "http://localhost:8081/inventory/"+warehouse.id+"/"+scope.priceListID,
    dataType: 'json',
    beforeSend: function(xhr,settings){
      //spinner show;
    },
    success: function(response){
      console.log(response);
      scope.completeProductList = response;
      response.forEach(function(element){
        inventoryProducts.push(element.title);
      });
    },
    error: function(xhr,status,errorThrown) {
      console.log("Error");
    },
    complete: function(xhr, status){
      autocomplete(document.getElementById('autocompleteProducts'),inventoryProducts);
      scope.warehouseChanged = false;
      scope.$apply();
    }
  });
}

function sendNewOrder() {
  let sentProducts = [];
  let newOrderDate = document.getElementById("startingDate").value + " " + document.getElementById("startingTime").value + " " + document.getElementById("finishingTime").value;
  console.log(newOrderDate);
  scope.selectedProducts.forEach(element => {
    sentProducts.push({id: element.id,price:element.price,qty:element.qty})
  });
  let data = {
    addressId: scope.clientAddress,
    clientId: scope.indexID,
    locationID: scope.locationID,
    pricelistId: scope.priceListID,
    warehouseId: scope.warehouseID,
    products: sentProducts,
    comments: newOrderDate
  }
  console.log(data);
  $.ajaxSetup({
    headers: { 'Access-Control-Allow-Origin':'*' , 'accept':'application/json', 'Content-Type':'application/json'}
  });
  $.ajax({
    method: 'POST',
    jsonp: 'callback',
    url: 'http://localhost:8081/neworder',
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    data: JSON.stringify({
      addressId: scope.clientAddress,
      clientId: scope.indexID,
      locationId: scope.locationID,
      pricelistId: scope.priceListID,
      warehouseId: scope.warehouseID,
      products: sentProducts,
      comments: newOrderDate
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

    }
  });
}

function NewClientRequest(NewClientInput){
  console.log(NewClientInput);
 
   $.ajax({
     method: 'POST',
     jsonp: 'callback',
     url: 'http://localhost:8081/newclient',
     contentType: "application/json; charset=utf-8",
     dataType: 'json',
     data: JSON.stringify({
          legalName: NewClientInput.NewClientName, 
          pricelistId: NewClientInput.SelectedPriceList, 
          telephone: NewClientInput.NewClientTelephone, 
          streetName: NewClientInput.NewClientStreet, 
          exteriorNo : NewClientInput.NewClientExtNumber,  
          colonia: NewClientInput.NewClientNeighborhood, 
          zipCode: NewClientInput.NewClientZipCode,
          city: NewClientInput.NewClientCity, 
          state: NewClientInput.NewClientState, 
          interiorNo: NewClientInput.NewClientIntNumber   
        }),
     beforeSend: function(xhr,settings){
       //spinner show;
     },
     success: function(response){
       console.log(response);
       if (response.code != 0){
          Swal.fire("¡Registro exitoso!", "Se ha registrado el cliente exitosamente", "success");
          $("#ModalNewClient").modal('hide');
          scope.showLoading = true; 
          scope.showLoadingModal = false;
          scope.showNewClient = false;
          scope.indexID = response; 
          console.log('Tu ID es ' + scope.indexID); 
          scope.clientPhone = NewClientInput.NewClientTelephone;
          scope.clientAddress = NewClientInput.NewClientStreet + ' '+  NewClientInput.NewClientExtNumber + ' '+  NewClientInput.NewClientNeighborhood + ' '+ NewClientInput.NewClientZipCode + ' '+ NewClientInput.NewClientCity + ' '+ NewClientInput.NewClientState; 
          scope.priceListID = NewClientInput.SelectedPriceList;
          scope.clientName = NewClientInput.NewClientName;

          $.ajaxSetup({
            headers: { 'Access-Control-Allow-Origin':'*' , 'accept':'application/json', 'Content-Type':'application/json'}
          })
          $.ajax({
            method: 'GET',
            jsonp: 'callback',
            url: 'http://localhost:8081/warehouses',
            dataType: 'json',
            beforeSend: function(xhr,settings){
              //spinner show;
            },
            success: function(response){
              console.log(response);
              scope.warehousesList = response;
              scope.showCompletedForm = true;
              scope.showLoading = false;
              scope.$apply();

              $('#datepicker').datepicker({
                dateFormat: 'dd-mm-yy'
              });
              $('#datepicker2').datepicker({
                dateFormat: 'dd-mm-yy'
              });
              console.log("init");
              $('.timepicker').timepicker({
                timeFormat: 'h:mm p',
                interval: 60,
                minTime: '10',
                maxTime: '6:00pm',
                defaultTime: '11',
                startTime: '10:00',
                dynamic: false,
                dropdown: true,
                scrollbar: true
              });

            },
            error: function(xhr,status,errorThrown) {
            },
            complete: function(xhr, status){
              
            }
          });

      }
      else {
        Swal.fire("Error", "Ingresa el estado y ciudad correctamente", "error");
        scope.showLoading = false; 
        scope.showLoadingModal = false;
        scope.$apply();
      }
     },
     error: function(xhr,status,errorThrown) {
       console.log(errorThrown);
       Swal.fire("Error", "Ha ocurrido un error, intente de nuevo", "error");
       scope.showLoading = false; 
       scope.showLoadingModal = false;
       scope.$apply();
     },
     complete: function(xhr, status){
      
     }
   });
 }