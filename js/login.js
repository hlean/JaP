(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
        let email = document.getElementById("email").value;

          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            console.log("no se mando")
          }
          else{
            window.location = "products.html"
            localStorage.setItem("userEmail", email);
          }
          form.classList.add('was-validated')
        }, false)
      })
  })()

// document.querySelector("#form").addEventListener('submit', function(viajeDatos){

//     viajeDatos.preventDefault();

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     let wE = document.querySelector("#warningEmail").innerHTML="";
//     let wP = document.querySelector("#warningPass").innerHTML = "";

//     if (email == "") {
//         document.querySelector("#warningEmail").innerHTML = "Email cannot be empty";
//         document.querySelector("#warningPass").innerHTML = "";
//         wE.classList.remove("text-danger");

//     }
//     else if (password == "") {
//         document.querySelector("#warningPass").innerHTML = "Password cannot be empty";
//         document.querySelector("#warningEmail").innerHTML = "";
//         wP.classList.remove("text-danger");

//     }
//     else {
//         window.location.href = "principal.html";
//         localStorage.setItem("userEmail", email);
//     }
    
// })
