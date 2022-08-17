let ProductsArrayAndCatName = [];

function setCatID(id) {
    localStorage.setItem("catID", id);
    window.location = "products.html"
}

function showProductsList() {
    let currentProductsArray = ProductsArrayAndCatName.products;

    title = `<h1>${ProductsArrayAndCatName.catName}</h1>
             <p>Aqui podras ver todos los productos de la categoria <strong>${ProductsArrayAndCatName.catName.toLowerCase()}</strong></p>`

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active">
                <div class="row">
                    <div class="col-3">
                        <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                    </div>
                    <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h3 class="mb-1">${product.name}</h3>
                    </div>
                        <p>${product.description}</p>
                    <div class="d-flex justify-content-between mt-5">
                        <p>Cantidad vendidos: ${product.soldCount}</p>
                        <p>${product.currency} ${product.cost}</p>
                    </div>
                </div>
            </div>
        </div>
            `
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
    document.getElementById("product-title").innerHTML = title;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let id = localStorage.getItem("catID");
    let url = PRODUCTS_URL + id + EXT_TYPE;

    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsArrayAndCatName = resultObj.data;
            showProductsList()
        }
    });
});