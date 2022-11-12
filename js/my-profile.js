// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()
  


const saveDates = document.getElementById('saveDates');
saveDates.addEventListener('click', () =>{
    let nombUno = document.getElementById('inpNombreUno').value;
    let nombDos = document.getElementById('inpNombreDos').value;
    let apellUno = document.getElementById('inpApellidoUno').value;
    let apellDos = document.getElementById('inpApellidoDos').value;
    let tel = document.getElementById('inpTel').value;

    localStorage.setItem("nombUno", nombUno);
    localStorage.setItem("nombDos", nombDos);
    localStorage.setItem("apellUno", apellUno);
    localStorage.setItem("apellDos", apellDos);
    localStorage.setItem("tel", tel);
    
})


document.addEventListener("DOMContentLoaded", function() {
    let email = localStorage.getItem("userEmail");
    if(email == null){
        window.location = "index.html"
    }
    document.getElementById('inpEmail').value = email;

    let nombUno = localStorage.getItem("nombUno");
    let nombDos = localStorage.getItem("nombDos");
    let apellUno = localStorage.getItem("apellUno");
    let apellDos = localStorage.getItem("apellDos");
    let tel = localStorage.getItem("tel");

    //Establece el valor ingresado por el usuario y guardado en el localstorage en el input correspondiente.
    document.getElementById('inpNombreUno').value = nombUno;
    document.getElementById('inpNombreDos').value = nombDos;
    document.getElementById('inpApellidoUno').value = apellUno;
    document.getElementById('inpApellidoDos').value = apellDos;
    document.getElementById('inpTel').value = tel;
})

