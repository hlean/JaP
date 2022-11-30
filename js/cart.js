
const carrito = document.getElementById('items-body');
const carritoStorage = document.getElementById('items-bodyStorage');
const bodyStorage = document.getElementById('bodyStorage');

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
        form.addEventListener("submit",function (event) {
                for (const radioButtonPago of radioButtonsPago) { /*Deseleccionar la opcion que elegio de envio si aumenta/disminuye la cantidad de productos*/

                    if (radioButtonPago.checked && (nroCuentaInput.value != "") || (nroTarjetaInput.value != "" && nroSeguritaInput.value != "" && vencInput.value != "")) {
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
                showTrigger.onclick = function () {
                    successAlert.style.display = "block";
                    successAlert.classList.remove("visually-hidden")
                }
            },
            false
        );
    });
})();


/*SELECCION DE PAGO, DESABILITAR Y HABILITAR OPCION SELECCIONADA*/

document.getElementById('selectBanc').addEventListener('click', function (e) {
    nroTarjetaInput.disabled = true;
    nroSeguritaInput.disabled = true;
    vencInput.disabled = true;
    nroCuentaInput.disabled = false;
});
document.getElementById('selectTarj').addEventListener('click', function (e) {
    nroCuentaInput.disabled = true;
    nroTarjetaInput.disabled = false;
    nroSeguritaInput.disabled = false;
    vencInput.disabled = false;
});


function showCarritoStorage() {
    let cant = 1;

    let arr = localStorage.getItem("arr");
    var arrObjects = JSON.parse(arr);

    let subtotal = 0
    if (arrObjects == null) {
        bodyStorage.innerHTML = `<br><br><b>Usted no tiene productos en el carrito.<b>`;
        cant = 0;
    }
    else {
        bodyStorage.innerHTML = "";
        Object.values(arrObjects).forEach(item =>{
            bodyStorage.innerHTML +=
            `
            <td><img src="${item.image}" class="img-fluid img" style="width: 15rem;"></td>
            <td class="pt-5">${item.nameP}</td>
            <td class="pt-5">${item.currency} ${item.cost}</td>
            <td class="pt-5">
              ${item.cantg}
            </td>
            <td class="pt-5">${item.currency} ${item.cost}</td>
            <td class="pt-5">
              <button type="button" onclick="eliminarProducto(${item.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path></svg>
                Delete
              </button>
            </td>
            `
            subtotal += item.cost * cant;
            })
    }
    for (const radioButton of radioButtons) { /*Deseleccionar la opcion que elegio de envio si aumenta/disminuye la cantidad de productos*/
        radioButton.checked = false;
    }
    return subtotal;
}

function showCost() {
    let subTotal = infoCost.querySelector("#subtotalCost").textContent = showCarritoStorage();
    for (const radioButton of radioButtons) {
        radioButton.addEventListener('change', function (e) {
            if (this.checked) {
                let envioCost = infoCost.querySelector("#costTrip").textContent = ((subTotal / 100) * radioButton.value).toFixed(2);
                infoCost.querySelector("#totalCost").textContent = subTotal + envioCost;
            }
        });
    }
    
}

const eliminarProducto = (id)=>{
    let arr = localStorage.getItem("arr");
    var arrObjects = JSON.parse(arr);

    const foundId = arrObjects.find((element)=> element.id == id);
    arrObjects = arrObjects.filter(foundId => foundId.id !=id);
    localStorage.setItem("arr", JSON.stringify(arrObjects));
    showCarritoStorage()
    showCost();
}

document.addEventListener("DOMContentLoaded", function () {
    let email = localStorage.getItem("userEmail");
    //let id = localStorage.getItem("userID");

    if (email == null) {
        window.location = "index.html"
    }

    let url = CART_INFO_URL + 25801 + EXT_TYPE;

    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ArrayCart = resultObj.data;
            showCost();
            showCarritoStorage()
        }
    });

})


