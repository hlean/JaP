let currentProductsArray = [];

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        htmlContentToAppend += `
        <div onclick="setCatID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h3 class="mb-1">${product.name}</h3>
                            <small class="text-muted">${product.currency} ${product.cost}</small>
                        </div>
                        <p class="mb-1">${product.description}</p><br><br>
                        <p class="mb-1">Cantidad vendidos: ${product.soldCount}</p>
                    </div>
                </div>
            </div>
            `

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}
const PRODUCTS_URL_AUTO = "https://japceibal.github.io/emercado-api/cats_products/101.json";

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL_AUTO).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data.products
            showProductsList()
        }
    });

});