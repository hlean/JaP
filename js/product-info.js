let ProductsInfoArray = [];
let ProductsComentsArray = [];

/*#################### FUNCIONES DE USO GENERAL #####################*/

function createDateTime(){
    var currentdate = new Date(); 
    var datetime =currentdate.getFullYear() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getDate() + " "  
                + currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return datetime;
}
function creatStars(coments){
    if(coments.score == 5){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>`
    }
    if(coments.score == 4){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star "></span>`
    }
    if(coments.score == 3){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    if(coments.score == 2){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    if(coments.score == 1){
        htmlContentToAppend = `                                
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    if(coments.score == 0){
        htmlContentToAppend = `                                
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    }
    return htmlContentToAppend;
}
/*####################################################################*/


function showProductsInfoList() {
    let img = "";
    htmlContentToAppend = 
    `<h1 class="text-title text-center">${ProductsInfoArray.name}</h1>
        <div class="list-group-item">
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
        img += `<div class="col-lg-3 col-md-4 col-sm-12 mb-2">
                    <div>
                        <img src="${ProductsInfoArray.images[i]}" class="card-img-top" alt="...">
                    </div>
                </div>`
        document.getElementById("products-img").innerHTML = img;
    }

}
function showProductsComents(){

    let htmlContentToAppend = "";
    for(let i = 0; i < ProductsComentsArray.length; i++){
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
                                ${creatStars(coments)}
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



const submit = document.getElementById("btn_addComent");
submit.addEventListener("click", function(){
    let txtArea = document.getElementById("txtArea").value;
    let score = document.getElementById("score").value;
    let email = localStorage.getItem("userEmail");
    if(score == 5){
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
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                        </div>
                    </div>
                    <div class="d-flex w-100 justify-content-end">
                        <small class="text-muted">${createDateTime()}</small>
                    </div>
                </div>
            </div>
        </div>
    `}
    if(score == 4){
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
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                        </div>
                    </div>
                    <div class="d-flex w-100 justify-content-end">
                        <small class="text-muted">${createDateTime()}</small>
                    </div>
                </div>
            </div>
        </div>
    `}
    if(score == 3){
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
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                    </div>
                    <div class="d-flex w-100 justify-content-end">
                        <small class="text-muted">${createDateTime()}</small>
                    </div>
                </div>
            </div>
        </div>
    `}
    if(score == 2){
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
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                    </div>
                    <div class="d-flex w-100 justify-content-end">
                        <small class="text-muted">${createDateTime()}</small>
                    </div>
                </div>
            </div>
        </div>
    `}
    if(score == 1){
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
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                    </div>
                    <div class="d-flex w-100 justify-content-end">
                        <small class="text-muted">${createDateTime()}</small>
                    </div>
                </div>
            </div>
        </div>
    `}
    if(score == 0){
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
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                        </div>
                    </div>
                    <div class="d-flex w-100 justify-content-end">
                        <small class="text-muted">${createDateTime()}</small>
                    </div>
                </div>
            </div>
        </div>`
    }
    document.getElementById("my-coments-container").innerHTML += htmlContentToAppend;
});


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
});








