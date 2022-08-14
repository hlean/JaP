function singIn(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(email !="" && password !=""){
        alert("Los campos estan completos");
    }
    else{
        alert("Los campos no pueden estar vacios");
    }
}
