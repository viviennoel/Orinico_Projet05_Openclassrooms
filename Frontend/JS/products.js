import { Product } from './Product.js';

//AFFICHER LA LISTE DES PRODUITS SUR LA PAGE

DisplayProductList();

function displayProductList() {
    fetch('http://localhost:3000/api/cameras').then(response => response.json()).then(response => createProductList(response))
        .catch(function (error) {
            console.log('there was a problem with the fetch : ' + error.message)
        })
}

//CREER UN TABLEAU DE TOUTES LES CARACTERISTIQUE APPELLÉE "PRODUCTLIST"

function createProductList(json) {

    const productList = [];
    for (let i = 0; i < json.length; i++) {
        productList.push(new Product(json[i]._id, json[i].name, json[i].price, json[i].description, json[i].imageUrl))
    }

    insertlisthtml(productList);
}

//AFFICHER LES PRODUITS A L'AIDE DE INNERHTML

function insertListHtml(productList) {
    let HtmlProductList = "";
    
    productList.forEach(Product => {
        HtmlProductList += `<div class="productlist">
                <h2>${Product.name}</h2>
                <p class="text-center">${Product.description}</p>
                <p class="priceproductslist">Price of the article: ${Product.price / 100 + '.' + Product.price % 100}</p>
                <img class="imageproduct" src="${Product.imageUrl}">
                <a class="button" onclick = "getqueryParams('${Product._id}')">Select</a>
            </div>`
    })

    document.getElementById('products').innerHTML = HTMLProductlist;
}

//QUERY PARAMETERS

function getqueryParams(Productid) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("id", Productid);
    history.pushState(null, null, "?" + queryParams.toString());
    window.location.replace("productDetail.html" + "?" + queryParams.toString());
}
