document.addEventListener("DOMContentLoaded", function() {
    let email = localStorage.getItem("userEmail");
    if(email == null){
        window.location = "index.html"
    }
})