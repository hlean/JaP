document.querySelector("#form").addEventListener('submit', function(viajeDatos){

    viajeDatos.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let message = "";

    if (email == "") {
        message = "Email cannot be empty";
    }
    else if (password == "") {
        message = "Password cannot be empty";
    }
    else {
        window.location.href = "principal.html";
        localStorage.setItem("userEmail", email);
    }
    document.querySelector("#warning").innerHTML = message;
})
