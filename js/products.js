let ProductsArrayAndCatName = [];
let currentProductsArray = ProductsArrayAndCatName.products;
const ORDER_ASC_BY_PRICE= "ASC$";
const ORDER_DESC_BY_PRICE = "DESC$";
const ORDER_BY_PROD_REL = "Price";

let currentSortCriteriaProduct = undefined;
let minPrice = undefined;
let maxPrice = undefined;

//Funcion que establece los criterios de ordenamiento.
function sortProducts(criteria, array){
    let result = [];
     if (criteria === ORDER_ASC_BY_PRICE){ /*Ordena de manera ascendente de acuerdo al precio*/
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if ( aPrice < bPrice ){ return -1; }
            if ( aPrice > bPrice ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){ /*Ordena de manera descendente de acuerdo al precio*/
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){ /*Ordena de manera descendente de acuerdo a la relevancia*/
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.soldCount);
            let bPrice = parseInt(b.soldCount);

            if ( aPrice > bPrice ){ return -1; }
            if ( aPrice < bPrice ){ return 1; }
            return 0;
        });
    }
    return result;
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

//Funcion que muestra los poductos dependiendo el criterio de ordenamiento o si fue buscado en el buscados de productos.
function showProductsList() {
    let currentProductsArray = ProductsArrayAndCatName.products;
    let itemSearch = document.getElementById('itemSearch').value.toLowerCase();

    title = `<h1>${ProductsArrayAndCatName.catName}</h1>
             <p>Aqui podras ver todos los productos de la categoria <strong>${ProductsArrayAndCatName.catName.toLowerCase()}</strong></p>`

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];

        
        let name = product.name.toLowerCase();
        let description = product.description.toLowerCase();

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice)) && (name.includes(itemSearch) ||description.includes(itemSearch))){

        htmlContentToAppend += `
        <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
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
        }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
    document.getElementById("product-title").innerHTML = title;
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteriaProduct = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteriaProduct, currentProductsArray);

    //Muestro los productos ordenados
    showProductsList();
}



/*Función que se ejecuta una vez que se haya lanzado el evento de
que el documento se encuentra cargado, es decir, se encuentran todos los elementos HTML presentes.*/
document.addEventListener("DOMContentLoaded", function (e) {
    let email = localStorage.getItem("userEmail");
    if(email == null){
        window.location = "index.html"
    }
    
    let id = localStorage.getItem("catID");
    let url = PRODUCTS_URL + id + EXT_TYPE;

    getJSONData(url).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductsArrayAndCatName = resultObj.data;
            showProductsList()
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data.products);
        }
    });

    document.getElementById("sortAscProduct").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDescProduct").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByPrice").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        //de productos.
        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
            minPrice = parseInt(minPrice);
        }
        else{
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
            maxPrice = parseInt(maxPrice);
        }
        else{
            maxPrice = undefined;
        }

        showProductsList();
    });
    document.querySelector('#itemSearch').addEventListener("input", function(){
        showProductsList();
    });
});