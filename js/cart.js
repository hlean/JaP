let ArrayCart = [];

const carrito = document.getElementById('items-body');

function showCarrito(cart){
    let cant = document.getElementById('cantCarrito').value;

    for (let i = 0; i < cart.articles.length; i++) {
        let item = cart.articles[i];
 
        carrito.querySelector('img').setAttribute('src', item.image);
        carrito.querySelectorAll('td')[1].textContent = item.name;
        carrito.querySelectorAll('td')[2].textContent = item.unitCost;
        
        carrito.querySelectorAll('td')[4].textContent = item.unitCost * cant;
        
    }
}




document.addEventListener("DOMContentLoaded", function() {
    let email = localStorage.getItem("userEmail");
    let id = localStorage.getItem("catID");

    if(email == null){
        window.location = "index.html"
    }

    let url = CART_INFO_URL + 25801 + EXT_TYPE;

    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ArrayCart = resultObj.data;
            showCarrito(ArrayCart);
        }
    });



    document.querySelector('#cantCarrito').addEventListener("input", function(){
        showCarrito(ArrayCart);
    });
})


// function showCarritoStorage(){   //CREO QUE VOY A NECESITAR HACER OTRA INTERFAZ DE CARGA PARA LOS DEL LOCALSTORAGE
    
//     let image = localStorage.getItem("productImage");
//     let name = localStorage.getItem("productName");
//     let cost = localStorage.getItem("productCost");
//     let subtotal = localStorage.getItem("productSubTotal");

//     carritoS.querySelector('img').setAttribute('src', image);
//     carritoS.querySelectorAll('td')[1].textContent = name;
//     carritoS.querySelectorAll('td')[2].textContent = cost;
//     carritoS.querySelectorAll('td')[4].textContent = subtotal;
// }