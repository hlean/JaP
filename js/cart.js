let ArrayCart = [];
const carrito = document.getElementById('items-body');
const infoCost = document.getElementById('infoCost');
const radioButtons = document.querySelectorAll('input[name="envio"]');
const radioButtonsPago = document.querySelectorAll('input[name="formPago"]');

let nroTarjetaInput = document.getElementById('nroTarjeta');
let nroSeguritaInput = document.getElementById('nroSeguridad');
let vencInput = document.getElementById('fechaVenc');
let nroCuentaInput = document.getElementById('nroCuenta');

var formaPago = document.getElementById("selectPago");
var txtError = document.getElementById("errorCheck");

const successAlert = document.getElementById("myAlert");
const showTrigger = document.getElementById("liveAlertBtn");


// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        for (const radioButtonPago of radioButtonsPago) { /*Deseleccionar la opcion que elegio de envio si aumenta/disminuye la cantidad de productos*/
 
            if (radioButtonPago.checked && (nroCuentaInput.value!="") || (nroTarjetaInput.value !="" && nroSeguritaInput.value !="" && vencInput.value !="")) {
                formaPago.classList.remove("text-danger");
                txtError.innerHTML = "";
            }
             
            else {
                formaPago.classList.add("text-danger");
                txtError.innerHTML = "Please select a payment method and complete the information";
            }
        }

        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
        showTrigger.onclick = function(){
            successAlert.style.display = "block";
            successAlert.classList.remove("visually-hidden")
        }  
    },
      false
    );
  });
})();


/*SELECCION DE PAGO, DESABILITAR Y HABILITAR OPCION SELECCIONADA*/

document.getElementById('selectBanc').addEventListener('click', function(e) {
    nroTarjetaInput.disabled = true;
    nroSeguritaInput.disabled = true;
    vencInput.disabled = true;
    nroCuentaInput.disabled = false;
});
document.getElementById('selectTarj').addEventListener('click', function(e) {
    nroCuentaInput.disabled = true;
    nroTarjetaInput.disabled = false;
    nroSeguritaInput.disabled = false;
    vencInput.disabled = false;
});


function showCarrito(cart){
    let cant = document.getElementById('cantCarrito').value;
    let subtotal = 0
    for (let i = 0; i < cart.articles.length; i++) {
        let item = cart.articles[i];
 
        carrito.querySelector('img').setAttribute('src', item.image);
        carrito.querySelectorAll('td')[1].textContent = item.name;
        carrito.querySelectorAll('td')[2].textContent =item.currency +" "+ item.unitCost;
        if(cant>0){
            carrito.querySelectorAll('td')[4].textContent = item.currency +" "+ item.unitCost * cant;
            subtotal = item.unitCost * cant;
        }
        else{
            alert("Para que sub total sea correcto, la cantidad debe de ser mayor a 0")
        }
    }
    for (const radioButton of radioButtons) { /*Deseleccionar la opcion que elegio de envio si aumenta/disminuye la cantidad de productos*/
            radioButton.checked=false;
      }

    return subtotal;
}

function showCost(){
    let subTotal = infoCost.querySelector("#subtotalCost").textContent = showCarrito(ArrayCart);
    for (const radioButton of radioButtons) {
        radioButton.addEventListener('change', function (e) {
            if (this.checked) {
                let envioCost = infoCost.querySelector("#costTrip").textContent = (subTotal / 100) * radioButton.value;
                infoCost.querySelector("#totalCost").textContent = subTotal + envioCost;
            }
          });
      }
}




document.addEventListener("DOMContentLoaded", function() {
    let email = localStorage.getItem("userEmail");
    let id = localStorage.getItem("catID");

    if(email == null){
        window.location = "index.html"
    }

    let url = CART_INFO_URL + 25801 + EXT_TYPE;

    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ArrayCart = resultObj.data;
            showCarrito(ArrayCart);
            showCost();
        }
    });

    document.querySelector('#cantCarrito').addEventListener("input", function(){
        showCarrito(ArrayCart);
        showCost();
    });
})


// function showCarritoStorage(){   //CREO QUE VOY A NECESITAR HACER OTRA INTERFAZ DE CARGA PARA LOS DEL LOCALSTORAGE
    
//     let image = localStorage.getItem("productImage");
//     let name = localStorage.getItem("productName");
//     let cost = localStorage.getItem("productCost");
//     let subtotal = localStorage.getItem("productSubTotal");

//     carritoS.querySelector('img').setAttribute('src', image);
//     carritoS.querySelectorAll('td')[1].textContent = name;
//     carritoS.querySelectorAll('td')[2].textContent = cost;
//     carritoS.querySelectorAll('td')[4].textContent = subtotal;
// }