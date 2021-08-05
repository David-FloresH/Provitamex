console.log("inicio");
let newProductID = "";
let newProductInventory = "";
let newProductPrice = "";

var app = angular.module("myApp", []);
var scope;

window.onload = function(){
  scope = angular.element($('#scope')).scope();
  scope.currentOrders = [];
  scope.orders = [];

  scope.warehousesList = [];
  getCalendarWarehouses();
  scope.$apply();
}

app.controller("MainController", ['$scope', function($scope) {
    $scope.options = ["Calendario","Registro de Pedido","Nuevo Cliente", "Consultas de Información"];
    $scope.pricelist = {
      Público : "f706d48f-1c23-4d4b-8f37-afb803e394a9",
      Mayoreo : "d280c8ee-6226-4cb3-9005-05f3658d4c42",
    }

    $scope.whichButtonIsIt = function(order){
      if($scope.activeOrClosed == "Activo"){
        return "btn btn-warning";
      }
      else{
        return "btn btn-danger";
      }
    }
    $scope.paymentMethods ={
      Efectivo : "1", 
      TarjetaCredito: "2", 
      TarjetaDebito: "3", 
      Transferencia: "7"
    }
  
    $scope.showForm = false;
    $scope.showCompletedForm = false;
    $scope.showCalendar = false;
    $scope.showLoading = false;
    $scope.showLoadingModal = false;
    $scope.showOrderDetails = false; 
    $scope.showLoadingTable = false;
    $scope.warehouseChanged = false;
    $scope.activeOrClosed = "";
    $scope.showDetails = false;
    $scope.showOrderDetailsMobile = false;
    $scope.showButtons = true;
    $scope.disableEditOrder = false;
    $scope.startingTime = "";
    $scope.finishingTime = "";
    $scope.startingDate = "";
    $scope.findClient = "";
    $scope.clientAddress = "";
    $scope.addedProduct = "";
    $scope.clientPhone = "";
    $scope.priceListID = "";
    $scope.calendarWarehouse = "";
    $scope.pickedDate = new Date();
    $scope.disableDiscountInput = false;
    $scope.subtotal = 0;
    $scope.discount = 0;
    $scope.totalSalePC = 0;
    $scope.clientList = [];
    $scope.warehousesList = [];
    $scope.clientListNames = [];
    $scope.selectedProducts = [];
    $scope.completeProductList = [];
    $scope.baseUrl = "https://www.google.com/maps/search/?api=1&query="
    $scope.completeAddress = "";
    $scope.bankAccounts = ""; 
    $scope.showFinishInvoice = true;
    $scope.showClientsDetails  = false; 
    $scope.showEditClient = false; 
    $scope.clientsDetailsId = ''; 
    $scope.OrderProducts = [];
  
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

     

    $scope.filterContent = function() {
       let optionPos = $scope.options.indexOf($scope.selectedOption);
       console.log(optionPos);
       switch (optionPos) {
           case 0:
                $scope.showCalendar = true;
                $scope.showForm = false;
                $scope.showCompletedForm = false;
                $scope.showNewClient = false; 
                $scope.showOrderDetailsMobile = false; 
                $scope.showButtons = false;
                break;
            
            case 1:
                $scope.showCalendar = false;
                $scope.showLoading = true;
                $scope.showForm = false;
                $scope.showCompletedForm = false;
                $scope.showNewClient = false;
                $scope.showOrderDetailsMobile = false; 

                searchClientName();
                break;
            case 2:
              $scope.showCalendar = false;
              $scope.showForm = false;
              $scope.showCompletedForm = false;
              $scope.showNewClient = true; 
              $scope.showOrderDetailsMobile = false;
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
             

       }
    };
    $scope.searchClientNamePC = function(){
      document.getElementById("clientInputPC").value = "";
      $scope.selectedProducts = [];
      searchClientNameForPC();
      $scope.showLoadingModal = true;
    }


    
    $scope.searchClientForPC = function(){
      $scope.totalSalePC = 0;
      $scope.subtotal = 0;
      $scope.discount = 0;
      $scope.showLoadingModal = true;
      $scope.indexID = '';
      $scope.clientName = document.getElementById("clientInputPC").value;
      $scope.clientList.forEach(function(element,index,arr){
        if(arr[index].clientName == $scope.clientName){
          $scope.indexID = arr[index].id;
        }
      });
      getCompletedFormInfoForPC();
    }

    $scope.searchClient = function (){
      $scope.showForm = false;
      $scope.showCompletedForm = true;
        $scope.showForm = false;
        $scope.showLoading = true;
        $scope.indexID = '';
        $scope.clientName = document.getElementById("clientInputPC").value;
        $scope.clientList.forEach(function(element,index,arr){
          if(arr[index].clientName == $scope.clientName){
            $scope.indexID = arr[index].id;
          }
        });
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

    $scope.discountActive = function(check){
      $scope.disableDiscountInput = check;
      if(!check){
        console.log("a cero");
        $scope.discount = 0;
        document.getElementById("discountValue").value = 0;
        $scope.totalSalePC = $scope.subtotal

      }
    }

    $scope.subtractDiscount = function(discount){
      if($scope.subtotal >= discount){
        $scope.totalSalePC = $scope.subtotal - discount;
      }
      else{
        document.getElementById("discountValue").value = 0;
        $scope.totalSalePC = $scope.subtotal;
      }
      
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
        $scope.subtotal += parseInt($scope.selectedProducts[0].price);
        $scope.totalSalePC += parseInt($scope.selectedProducts[0].price);
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
        $scope.subtotal += parseInt($scope.selectedProducts[index].price);
        $scope.totalSalePC += parseInt($scope.selectedProducts[index].price)
        console.log($scope.subtotal);
      }
    }

    $scope.decrease = function(index){
      if($scope.selectedProducts[index].qty == 1){
        console.log("I am in");
      }
      else{
        $scope.selectedProducts[index].qty -= 1;
        $scope.subtotal -= parseInt($scope.selectedProducts[index].price);
        $scope.totalSalePC -= parseInt($scope.selectedProducts[index].price);
        console.log($scope.subtotal);
      }
    }

    $scope.delete = function(index){
      $scope.subtotal -= parseInt($scope.selectedProducts[index].qty * $scope.selectedProducts[index].price);
      $scope.totalSalePC -= parseInt($scope.selectedProducts[index].qty * $scope.selectedProducts[index].price);
      $scope.selectedProducts.splice(index,1);
      if($scope.selectedProducts.length == 0){
        $scope.disableDiscountInput = false;
        $scope.subtotal = 0;
        document.getElementById("flexCheckChecked").checked = false;
        document.getElementById("discountValue").value = 0;
        $scope.totalSalePC = 0;
      }
    }

    $scope.sendForm = function(){
      $scope.totalSale = 0;
      $scope.selectedProducts.forEach(product => {
        $scope.totalSale += (parseFloat(product.qty*product.price));
      })
      $('#staticBackdrop').modal('show');
    }

    $scope.finishOrder = function(){
      sendNewOrder();
    }

    $scope.changeWarehouse = function(warehouse){
      $scope.selectedProducts = [];
      console.log(warehouse);
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

    $scope.showList = function(){
      $scope.showClientLists = true; 
      $scope.showLoadingTable= true;
      getClientsList();
    }

    $scope.editClient = function(clientEditing){
     
      editId = $scope.clientList[clientEditing].id;
      console.log(editId);
      getClientsDetails(editId);
    }

    $scope.deleteClient = function(clientDeleting, name){
     
      deleteClient(clientDeleting, name);
    }

    $scope.showDetailsBox = function(ID){
      $scope.showLoadingModal = true; 
      console.log(ID);
      getClientsDetails(ID);
    }



    $scope.closeDetailsModal = function(){
     $scope.showClientsDetails = false; 
     $scope.showEditClient = true; 
    }

    $scope.EditClientSetup = function(){
      console.log('price list seleccionado ' + $scope.priceListIdDetails)
    editClientInformation = {
        Id : $scope.clientsDetailsId,
        ClientName : $scope.clientNameDetails,  
        Telephone:  $scope.clientPhoneDetails, 
        PriceList: $scope.priceListIdDetails ,
        Street: $scope.ClientStreet, 
        ExtNumber : $scope.ClientExtNumber,  
        Neighborhood:$scope.ClientNeighborhood, 
        ZipCode:$scope.ClientZipCode,
        City:$scope.ClientCity, 
        State:$scope.ClientState, 
        IntNumber: $scope.ClientIntNumber,
        Comments: $scope.ClientStreet+' No. '+$scope.ClientExtNumber+' '+$scope.ClientIntNumber+' Col. '+$scope.ClientNeighborhood+', '+$scope.ClientCity+', '+$scope.ClientState+' C.P '+$scope.ClientZipCode+' Mexico'
      }
      console.log('edit '+editClientInformation.Comments)
      editClientRequest(editClientInformation);
    }

    $scope.getUrl = function(){
      $scope.completeAddress = $scope.NewClientInputPC.NewClientStreet + ' ' + $scope.NewClientInputPC.NewClientExtNumber + ' ' + $scope.NewClientInputPC.NewClientIntNumber + ',' +$scope.NewClientInputPC.NewClientNeighborhood + ',' + $scope.NewClientInputPC.NewClientState ; 
      var completeAddressSplitted =  $scope.completeAddress.split(" ");
      var addressFormat1= ""; 
      var addressFormat = "";
      for (var i = 0; i <completeAddressSplitted.length; i++){
         addressFormat1 = addressFormat1 + completeAddressSplitted[i]; 
         addressFormat1 = addressFormat1 +"+";
      }
      var completeAddressSplitted2  = addressFormat1.split(",");
      for (var i = 0; i <completeAddressSplitted2.length; i++){
          addressFormat = addressFormat + completeAddressSplitted2[i]; 
          addressFormat = addressFormat +"%2C";
      }
      url = $scope.baseUrl + addressFormat;
      document.getElementById('enlace').setAttribute('href',url); 
    }

    $scope.getUrl2 = function(){
      $scope.completeAddress = $scope.NewClientInputMobile.NewClientStreet + ' ' + $scope.NewClientInputMobile.NewClientExtNumber + ' ' + $scope.NewClientInputMobile.NewClientIntNumber + ',' +$scope.NewClientInputMobile.NewClientNeighborhood + ',' + $scope.NewClientInputMobile.NewClientState ; 
      var completeAddressSplitted =  $scope.completeAddress.split(" ");
      var addressFormat1= ""; 
      var addressFormat = "";
      for (var i = 0; i <completeAddressSplitted.length; i++){
         addressFormat1 = addressFormat1 + completeAddressSplitted[i]; 
         addressFormat1 = addressFormat1 +"+";
      }
      var completeAddressSplitted2  = addressFormat1.split(",");
      for (var i = 0; i <completeAddressSplitted2.length; i++){
          addressFormat = addressFormat + completeAddressSplitted2[i]; 
          addressFormat = addressFormat +"%2C";
      }
      url = $scope.baseUrl + addressFormat;
      console.log(url);
            document.getElementById('enlace2').setAttribute('href',url); 
    }

    $scope.dateChanged = function(){
      console.log("cambio de fecha")
    }

    $scope.searchOrdersByDate = function(){
      let newStatus = "0"
      if($scope.activeOrClosed == "Activo"){
        newStatus = "0"
      }
      else{
        newStatus = "1"
      }
      let newDate = document.getElementById("calendarDate").value;
      getOrdersByDate($scope.calendarWarehouse.id,newStatus,newDate);
    }

    $scope.changeOrders = function(){

    }

    $scope.changeOrdersStatus = function(){
      $scope.currentOrders = [];
    }
    
    $scope.getUrl3 = function(){
      $scope.completeAddress = $scope.OrderDetailsAddress; 
      console.log($scope.completeAddress);
      var completeAddressSplitted =  $scope.completeAddress.split(" ");
      var addressFormat1= ""; 
      var addressFormat = "";
      for (var i = 0; i <completeAddressSplitted.length; i++){
         addressFormat1 = addressFormat1 + completeAddressSplitted[i]; 
         addressFormat1 = addressFormat1 +"+";
      }
      var completeAddressSplitted2  = addressFormat1.split(",");
      for (var i = 0; i <completeAddressSplitted2.length; i++){
          addressFormat = addressFormat + completeAddressSplitted2[i]; 
          addressFormat = addressFormat +"%2C";
      }
      url = $scope.baseUrl + addressFormat;
      console.log(url);
            document.getElementById('enlace3').setAttribute('href',url); 

    }

    $scope.OrderDetails = function (){
      var source = "pc";
      $scope.orderId = "315b4827-2723-4793-aa19-4ffc6f66865a";
      $scope.showLoadingModal = true; 
      GetOrderDetails($scope.orderId, source)
     
      console.log("holi se logró")
    }

    $scope.OrderDetails2 = function (ID){
      var source = "mobile"; 
      console.log(ID);
      $scope.showCalendar = false; 
      $scope.showOrderDetailsMobile = true;
      $scope.showLoadingOrderDetails = true; 
      
      getOrderDetails(ID,source)
      getBankAccounts(); 

    }

    $scope.disable = function(){
      getClientsDetails($scope.OrderDetailsClientId);
      if ($scope.disableEditOrder == false){
        $scope.disableEditOrder = true; 
      }else {
        $scope.disableEditOrder = false;
      }
    }

    $scope.bankAccount = function(index){
      $scope.selectedBankAccount = $scope.bankAccounts[index].id;
      console.log('Bank account '+$scope.selectedBankAccount); 
  }


  $scope.finishInvoice = function(orderId){
    newInvoice = {
    orderId : orderId,
    clientID: $scope.OrderDetailsClientId,  
    locationId: $scope.OrderDetailsLocationID,  
    pricelistId:$scope.clientsPriceListID, 
    warehouseId:$scope.OrdersDetailsWarehouseId,
    products: $scope.OrderProducts,
    payments:[
        {
            PaymentMethod: $scope.newInvoicePaymentMethod, 
            AccountID: $scope.selectedBankAccount, 
            Amount: $scope.OrderDetailsTotal 
        }
    ],
   }
   newInvoiceRequest(newInvoice); 
}

       
      
}])



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
        scope.showLoadingModal = false;
        scope.showCompletedForm = true;
        scope.showLoading = false;
        scope.$apply();
      }
    });
  }

  function getCompletedFormInfoForPC() {
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
        scope.clientAddress = response.comments;
        scope.addressID = response.addresses[0];
        scope.priceListID = response.priceListID;
        scope.$apply();
      },
      error: function(xhr,status,errorThrown) {
        console.log("Error");
      },
      complete: function(xhr, status){
        console.log("init");
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
        scope.showLoadingModal = false;
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

function searchClientNameForPC(){
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
      scope.showLoadingModal = false;
      scope.clientList = response;
      console.log(scope.clientList);
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
      autocomplete(document.getElementById('clientInputPC'),clientListNames);
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
  console.log(scope.discount);
  let newDiscount = parseFloat(document.getElementById("discountValue").value).toFixed(4);
  console.log(newDiscount);
  let sentProducts = [];
  let services = [];
  let newOrderDate = document.getElementById("startingTime").value + " " + document.getElementById("finishingTime").value;
  console.log(document.getElementById("startingDate"));
  scope.selectedProducts.forEach(element => {
    sentProducts.push({ID:element.id,Price:element.price,Qty:element.qty});
  });
  var  date = document.getElementById("startingDate").value + "T00:00:00";
  console.log(date);
  let data = {
    addressId: scope.clientAddress,
    clientId: scope.indexID,
    locationID: scope.locationID,
    pricelistId: scope.priceListID,
    warehouseId: scope.warehouseID,
    products: sentProducts,
    comments: newOrderDate, 
    orderDate: date
  }
  console.log(data);
  $.ajaxSetup({
    headers: { 'Access-Control-Allow-Origin':'*' , 'accept':'application/json', 'Content-Type':'application/json'}
  });
  $.ajax({
    method: 'POST',
    jsonp: 'callback',
    url: 'http://localhost:8081/order/new',
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    data: JSON.stringify({
      addressId: scope.addressID,
      clientId: scope.indexID,
      locationId: scope.locationID,
      pricelistId: scope.priceListID,
      warehouseId: scope.warehouseID,
      orderDate: date,
      discountAmount: newDiscount,
      products: sentProducts,
      services: sentProducts,
      comments: newOrderDate
    }),
    beforeSend: function(xhr,settings){
      //spinner show;
    },
    success: function(response){
      console.log(response);
      $('#staticBackdrop').modal('hide');
      document.getElementById("clientInput").value = "";
      scope.showCompletedForm = false;
      Swal.fire("Orden Exitosa!", "Se ha registrado la orden correctamente.", "success");
      $('#newOrderModal').modal('hide');
      scope.$apply();
    },
    error: function(xhr,status,errorThrown) {
      Swal.fire("Error", "Ha ocurrido un error.", "error");
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
     url: 'http://localhost:8081/client/new',
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

 function getClientsList(){
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
      scope.clientList = response;
      console.log(scope.clientList);
      scope.showLoadingTable = false;
      scope.$apply();
    },
    error: function(xhr,status,errorThrown) {
      console.log("Error");
    },
    complete: function(xhr, status){
  
    }
  });
} 

function getClientsDetails(ID){
  $.ajaxSetup({
    headers: { 'Access-Control-Allow-Origin':'*' , 'accept':'application/json', 'Content-Type':'application/json'}
  });
  $.ajax({
    method: 'GET',
    jsonp: 'callback',
    url: 'http://localhost:8081/clients/'+ID,
    dataType: 'json',
    beforeSend: function(xhr,settings){
      
    },
    success: function(response){
      console.log(response);
      scope.clientNameDetails = response.commercialName; 
      scope.clientPhoneDetails = response.telephones;
      scope.clientAddressDetails = response.comments;
      scope.clientsPriceListID = response.priceListID;
      priceListName = getPriceListName(response.priceListID);
      scope.priceListIdDetails = priceListName;
      showDetailsContainer = true;
      scope.clientsDetailsId = ID; 

      scope.ClientStreet = scope.clientAddressDetails.split(' No. ')[0]; 
      scope.ClientExtNumber = scope.clientAddressDetails.split(' ')[3]; 
      scope.ClientIntNumber = scope.clientAddressDetails.split(' ')[4];
      scope.ClientCity = scope.clientAddressDetails.split(',')[1];
      scope.addressaux = scope.clientAddressDetails.split(', '); 
      scope.ClientNeighborhood = scope.addressaux[0].split('Col. ')[1]; 
      scope.ClientState = scope.clientAddressDetails.split(' ')[9] + ' '+ scope.clientAddressDetails.split(' ')[10]; 
      scope.ClientZipCode = scope.clientAddressDetails.split(' ')[12];

      
      scope.$apply();
    },
    error: function(xhr,status,errorThrown) {
      console.log("Error");
    },
    complete: function(xhr, status){
    scope.showLoadingModal = false;
    scope.showClientsDetails = true; 
    scope.$apply()
    },
    
  });

}

function getPriceListName(priceListID){
  for(let property in scope.pricelist ){
     console.log(scope.pricelist[property]);
    if (scope.pricelist[property] == priceListID)

      return property;
  }
}

function deleteClient(ID, Name){
  Swal.fire({
    title: '¿Seguro que desea eliminar?',
    text: "Esta acción no podrá revertirse",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
            $.ajaxSetup({
              headers: { 'Access-Control-Allow-Origin':'*' , 'Content-Type':'application/json'}
            });
            $.ajax({
              method: 'DELETE',
              jsonp: 'callback',
              url: 'http://localhost:8081/delete/client/'+ID,
              dataType: 'json',
              beforeSend: function(xhr,settings){
                
              },
              success: function(response){
                
              },
              error: function(xhr,status,errorThrown) {
                console.log("Error");
              },
              complete: function(xhr, status){
                Swal.fire(
                  'Cliente Eliminado',
                  'El cliente '+Name+ 'ha sido eliminado',
                  'success'
                )
                },
            });
    }
  })
}

function editClientRequest(clientInfo){
  console.log(clientInfo)
   Swal.fire({
     title: '¿Seguro que desea editar?',
     text: "Esta acción no podrá revertirse",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Editar '
      }).then((result) => {
       if (result.isConfirmed) {
         console.log(clientInfo)
         $.ajax({
           method: 'POST',
           jsonp: 'callback',
           url: 'http://localhost:8081/client/edit',
           contentType: "application/json; charset=utf-8",
           dataType: 'json',
           data: JSON.stringify({
               id: clientInfo.Id,
               legalName: clientInfo.ClientName, 
               pricelistId: clientInfo.PriceList, 
               telephone: clientInfo.Telephone, 
               streetName: clientInfo.Street, 
               exteriorNo :clientInfo.ExtNumber,  
               colonia: clientInfo.Neighborhood, 
               zipCode: clientInfo.ZipCode,
               city: clientInfo.City, 
               state: clientInfo.State, 
               interiorNo: clientInfo.IntNumber, 
               
             }),
           beforeSend: function(xhr,settings){
             //spinner show;
           },
           success: function(response){
            
           },
           error: function(response) {
             console.log(response);
             if (response.responseText == 'Client Edit Success'){
               Swal.fire(
               'Cliente Editado',
               'El cliente ha sido editado satisfactoriamente',
               'success')

               scope.clientNameDetails = response.commercialName; 
               scope.clientPhoneDetails = response.telephones;
               scope.clientAddressDetails = response.comments;
               scope.clientsPriceListID = response.priceListID;
               priceListName = getPriceListName(response.priceListID);
               scope.priceListIdDetails = priceListName;
               console.log('el id en el request es '+ scope.clientsPriceListID);
               scope.clientsDetailsId = clientInfo.Id; 
               scope.showClientsDetails = true; 
               scope.showEditClient = false; 
               scope.$apply();
             }
             else {
               Swal.fire(
                 'Error',
                 'Intente de nuevo',
                 'error')
 
             }
           },
           complete: function(xhr, status){     
           }
         });
       }
      })
      
 }
  
 

function getCalendarWarehouses(){
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
      scope.calendarWarehousesList = response;
      console.log(scope.calendarWarehousesList)
    },
    error: function(xhr,status,errorThrown) {
      console.log("Error");
    },
    complete: function(xhr, status){
      
    }
  });
}


function getOrderDetails(orderId, scr){
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
  
      scope.OrderDetailsClientId = response.clientID;
      scope.OrderDetailsName = response.clientName;
      scope.OrderDetailsphone = response.phoneNumber; 
      scope.OrderDetailsAddress = response.address; 
      scope.OrderDetailsWarehouse = response.warehouseName;
      scope.OrderDetailsDate = response.orderDate; 
      scope.OrderDetailsEmployee = response.empoyeeName;
      scope.OrderDetailsProducts = response.products;
      scope.OrderDetailsTotal = response.total;
      scope.OrderDetailsSubtotal = response.productSubtotal;
      scope.OrderDetailsDiscount = response.discount;
      scope.OrderDetailsLocationID = response.locationID; 
      scope.OrdersDetailsWarehouseId = response.warehouseID;
      scope.startingTime = response.comments.split(' ')[0]; 
      scope.finishingTime = response.comments.split(' ')[1]; 
      console.log(scope.OrderDetailsName);

      scope.OrderDetailsProducts.forEach(element => {

        scope.OrderProducts.push({ID:element.productID,Price:element.price,Qty:element.qty})
      
        }
      );

      console.log('productos de la orden son' + scope.OrderProducts);

      if (scr == 'pc'){
        console.log('vengo de pc');
        scope.showLoadingModal = false; 
        scope.showOrderDetails= true;
      } else if(scr == "mobile"){
        console.log('vengo del mobile');
        scope.showLoadingOrderDetails = false; 
        scope.showButtons = false; 
        scope.showDetails = true; 
      }
      scope.$apply();
    },
    error: function(xhr,status,errorThrown) {
      console.log("Error");
    },
    complete: function(xhr, status){
      
    }
  });

}



function getBankAccounts()
{

  $.ajaxSetup({
    headers: { 'Access-Control-Allow-Origin':'*' , 'accept':'application/json', 'Content-Type':'application/json'}
  })
  $.ajax({
    method: 'GET',
    jsonp: 'callback',
    url: 'http://localhost:8081/accounts', 
    dataType: 'json',
    beforeSend: function(xhr,settings){
      //spinner show;
    },
    success: function(response){
      scope.bankAccounts = response; 
      console.log(scope.bankAccounts); 
      scope.$apply();

    },
    error: function(xhr,status,errorThrown) {
      console.log("Error");
    },
    complete: function(xhr, status){
    }
      
    
  });
}

function newInvoiceRequest(newInvoice)
{
  $.ajax({
    method: 'POST',
    jsonp: 'callback',
    url: 'http://localhost:8081/newinvoice',
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    data: JSON.stringify({
        clientId: newInvoice.clientID,
        locationId: newInvoice.locationId,  
        pricelistId:newInvoice.pricelistId, 
        warehouseId: newInvoice.warehouseId,
        products:newInvoice.products,
        payments: newInvoice.payments
        
       }),
    beforeSend: function(xhr,settings){
      //spinner show;
    },
    success: function(response){
      Swal.fire("Venta Registrada", "La venta se registró correctamente", "success"); 
      scope.showOrderDetailsMobile = false;   
      scope.showCalendar = true; 
      scope.$apply()  
      deleteOrder(newInvoice.orderId); 
    },
    error: function(xhr,status,errorThrown) {
      console.log("Error");
    },
    complete: function(xhr, status){
    }
  });

}

function getOrdersByDate(warehouse,status,date){
  $.ajaxSetup({
    headers: { 'Access-Control-Allow-Origin':'*' , 'accept':'application/json', 'Content-Type':'application/json'}
  });
  $.ajax({
    method: 'GET',
    jsonp: 'callback',
    url: 'http://localhost:8081/orders',
    contentType: "application/json; charset=utf-8",
    dataType: 'json',
    data: {
      status: status,
      orderDate: date,
      warehouseId: warehouse
    },
    beforeSend: function(xhr,settings){
      //spinner show;
    },
    success: function(response){
      scope.currentOrders = response;
      scope.$apply();
    },
    error: function(xhr,status,errorThrown) {
      Swal.fire("Error", "Ha ocurrido un error.", "error");
      console.log(status);
    },
    complete: function(xhr, status){
  
    }
  });
}

function deleteOrder(orderID){

  $.ajax({
    method: 'DELETE',
    jsonp: 'callback',
    url: 'http://localhost:8081/delete/order/'+ID,
    dataType: 'json',
    beforeSend: function(xhr,settings){
  
    },
    success: function(response){
      
    },
    error: function(xhr,status,errorThrown) {
      console.log("Error");
    },
    complete: function(xhr, status){
     console.log('listo merenges');
      },
  });

}