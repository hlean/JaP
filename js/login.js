document.querySelector("#form").addEventListener('submit', function (viajeDatos) {

  viajeDatos.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;



  if (email == "") {
    document.querySelector("#warningEmail").innerHTML = "Please provide an email address.";
    document.querySelector("#warningPass").innerHTML = "";
  }
  else if (password == "" || password.length < 6) {
    document.querySelector("#warningPass").innerHTML = "Please provide a valid password.";
    document.querySelector("#warningEmail").innerHTML = "";
  }
  else {
    window.location.href = "principal.html";
    localStorage.setItem("userEmail", email);
  }

})