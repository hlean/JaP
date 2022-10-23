document.querySelector("#form").addEventListener('submit', function(viajeDatos){

    viajeDatos.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    document.querySelector("#warningEmail").innerHTML="";
    document.querySelector("#warningPass").innerHTML = "";

    if (email == "") {
        document.querySelector("#warningEmail").innerHTML = "Email cannot be empty";
        document.querySelector("#warningPass").innerHTML = "&nbsp";
    }
    else if (password == "") {
        document.querySelector("#warningPass").innerHTML = "Password cannot be empty";
        document.querySelector("#warningEmail").innerHTML = "&nbsp";
    }
    else {
        window.location.href = "principal.html";
        localStorage.setItem("userEmail", email);
    }
    
})
