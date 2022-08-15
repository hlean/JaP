function singIn() {
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

    }
    document.querySelector("#warning").innerHTML = message;
}
