console.log("inicio");

var app = angular.module("myApp", []);

app.controller("MainController", ['$scope', function($scope) {
    $scope.options = ["Calendario","Registro de Venta","Consultas de Información"];
    $scope.warehouses = ["César","Esteban","Iván"];
    $scope.selectedProducts = [];
    $scope.showForm = false;
    $scope.showCompletedForm = false;
    $scope.showCalendar = true;
    $scope.findClient = "";
    $scope.addedProduct = "";

    $scope.filterContent = function() {
       let optionPos = $scope.options.indexOf($scope.selectedOption);
       console.log(optionPos);
       switch (optionPos) {
           case 0:
                $scope.showCalendar = true;
                $scope.showForm = false;
                $scope.showCompletedForm = false;
                break;
            
            case 1:
                $scope.showCalendar = false;
                $scope.showForm = true;
                $scope.showCompletedForm = false;
                break;
       }
    };

    $scope.searchClient = function (){
        $scope.clientName = document.getElementById("clientInput").value;
        $scope.showForm = false;
        $scope.showCompletedForm = true;
        $scope.clientAddress = "Rio Mayo #1382 Col. Santa Teresa";
        $scope.clientPhone = "686-118-6158";
    }

    $scope.changeClient = function(){
        $scope.showForm = true;
        $scope.showCompletedForm = false;
        $scope.clientName = "";
    }

    $scope.addProducts = function(){
        $scope.selectedProducts.unshift({
          id: "",
          name: $scope.addedProduct,
          quantity: 1,
          price: 55
        });

        $scope.addedProduct = '';
    }

    $scope.increase = function(index){
      $scope.selectedProducts[index].quantity += 1;
    }
    $scope.decrease = function(index){
      if($scope.selectedProducts[index].quantity == 1){
        console.log("I am in");
      }
      else{
        $scope.selectedProducts[index].quantity -= 1;
      }
    }
    $scope.delete = function(index){
      $scope.selectedProducts.splice(index,1);
    }

    $scope.sendForm = function(){
      $scope.totalSale = 0;
      $scope.selectedProducts.forEach(product => {
        $scope.totalSale += (product.quantity*product.price);
      })
      $('#staticBackdrop').modal('show');
      console.log("enviar");
    }

    $scope.finishOrder = function(){
      $('#staticBackdrop').modal('hide');
      document.getElementById("clientInput").value = "";
      $scope.showCompletedForm = false;
      $scope.showForm = true;
      Swal.fire("Exitoso!", "Se ha registrado la orden correctamente", "success");
    }


}]);

var names = ["Manuel Montoya","Marco","Miguel","Jonathan","Sofia","David","Karen"];
var products = ["Lorem ipsum dolor sit amet","consectetur adipiscing","placerat tellus, eget varius","Cras interdum"];

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

autocomplete(document.getElementById("clientInput"), names);
autocomplete(document.getElementById("productInput"), products);