document.querySelector("#form").addEventListener('submit', singIn);


function singIn(viajeDatos) {

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
        this.submit();
        window.location.href = "principal.html";

    }
    document.querySelector("#warning").innerHTML = message;
}
