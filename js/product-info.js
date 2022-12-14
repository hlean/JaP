let ProductsInfoArray = [];
let ProductsComentsArray = [];
let storageCart = [];

/*#################### FUNCIONES DE USO GENERAL #####################*/
function createDateTime() {
    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getDate() + " "
        + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return datetime;
}
//Funcion que transforma la candidad de estrellas acorde al numero de estrellas indicado por el usuario en el select de comentarios. 
function creatStars(coments) {
    if (coments == 5) {
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>`
    }
    if (coments == 4) {
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star "></span>`
    }
    if (coments == 3) {
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    if (coments == 2) {
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    if (coments == 1) {
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    if (coments == 0) {
        htmlContentToAppend = `                                
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    return htmlContentToAppend;
}
function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

/*####################################################################*/

//Funcion que lista la informacion del producto al cual entramos.
function showProductsInfoList() {
    let img = "";
    let products = "";

    htmlContentToAppend =
        `<h1 class="text-title text-center">${ProductsInfoArray.name}</h1>
        <div >
            <div class="col">
                <div class="w-100">
                    <h3 class="mb-1">Price</h3>
                    <p>${ProductsInfoArray.currency}${ProductsInfoArray.cost}</p>
                </div>
                <div class="w-100">
                    <h3 class="mb-1">Description</h3>
                    <p>${ProductsInfoArray.description}</p>
                </div>
                <div class="w-100">
                    <h3 class="mb-1">Category</h3>
                    <p>${ProductsInfoArray.category}</p>
                </div>
                <div class="w-100">
                    <h3 class="mb-1">Sold Count</h3>
                    <p>${ProductsInfoArray.soldCount}</p>
                </div>
            </div>
        </div>`
    document.getElementById("product-info-container").innerHTML = htmlContentToAppend;

    for (let i = 0; i < ProductsInfoArray.images.length; i++) {
        img = `
    <div class="carousel-item">
      <img src="${ProductsInfoArray.images[i]}" class="d-block w-100" alt="...">
    </div>`
        document.getElementById("products-img").innerHTML += img;
    }

    for (let j = 0; j < ProductsInfoArray.relatedProducts.length; j++) {
        let item = ProductsInfoArray.relatedProducts[j]
        products += `<div onclick="setProductID(${item.id})" class="card cursor-active list-group-item list-group-item-action mb-2 me-3" style="width: 18rem;">
                        <img class="card-img-top" src="${item.image}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                        </div>
                    </div>`
        document.getElementById("products-related-container").innerHTML = products;
    }

}
//Funcion que lista los comentarios de la api.
function showProductsComents() {

    let htmlContentToAppend = "";
    for (let i = 0; i < ProductsComentsArray.length; i++) {
        let coments = ProductsComentsArray[i];

        htmlContentToAppend += `
            <div class="list-group-item">
                <div class="row">
                    <div class="col p-3">
                        <div class="d-flex justify-content-between">
                            <div>
                                <h5 class="mb-1 d-inline">${coments.user}: </h5> 
                                <p class="d-inline">${coments.description}</p>
                            </div>
                            <div>
                                ${creatStars(coments.score)}
                            </div>
                        </div>
                        <div class="d-flex w-100 justify-content-end">
                            <small class="text-muted">${coments.dateTime}</small>
                        </div>
                    </div>
                </div>
            </div>
        `
        document.getElementById("coments-list-container").innerHTML = htmlContentToAppend;
    }
}
//Funcion que crea y lista el comentario ingresado por el usuario en el momento que lo hace.
const submit = document.getElementById("btn_addComent");
submit.addEventListener("click", function () {
    let txtArea = document.getElementById("txtArea").value;
    let score = document.getElementById("score").value;
    let email = localStorage.getItem("userEmail");
    if (email == null) {
        window.location = "index.html"
    }

    if (score != "#" && txtArea) {
        htmlContentToAppend = `
        <div class="list-group-item">
            <div class="row">
                <div class="col p-3">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h5 class="mb-1 d-inline">${email}: </h5> 
                            <p class="d-inline">${txtArea}</p>
                        </div>
                        <div>
                        ${creatStars(score)}
                        </div>
                    </div>
                    <div class="d-flex w-100 justify-content-end">
                        <small class="text-muted">${createDateTime()}</small>
                    </div>
                </div>
            </div>
        </div>
    `
        document.getElementById("my-coments-container").innerHTML += htmlContentToAppend;
    }
    else {
        document.querySelector("#warning").innerHTML = "Opinion and score cannot be empty";
    }
});

function comprar(ProductsInfoArray) {
    let myObject = new Object();
    let storageCart = localStorage.getItem("arr");
    storageCart = JSON.parse(storageCart);


    if (storageCart == null) 
        storageCart = []

    myObject.id = ProductsInfoArray.id;
    myObject.image = ProductsInfoArray.images[0];
    myObject.nameP = ProductsInfoArray.name;
    myObject.cost = ProductsInfoArray.cost;
    myObject.cant = 1;
    myObject.currency = ProductsInfoArray.currency;
    storageCart.push(myObject);
    localStorage.setItem("arr", JSON.stringify(storageCart));
}



document.addEventListener("DOMContentLoaded", function (e) {

    let id = localStorage.getItem("productID");
    let url = PRODUCT_INFO_URL + id + EXT_TYPE;

    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsInfoArray = resultObj.data;
            showProductsInfoList()
        }
    });

    let idProduct = localStorage.getItem("productID");
    let urlComents = PRODUCT_INFO_COMMENTS_URL + idProduct + EXT_TYPE;

    getJSONData(urlComents).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsComentsArray = resultObj.data;
            showProductsComents()
        }
    });

    document.getElementById("btnComprarUnico").addEventListener("click", function () {
        comprar(ProductsInfoArray);
    });
});





