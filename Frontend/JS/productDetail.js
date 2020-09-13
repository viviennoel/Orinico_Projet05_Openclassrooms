//FUNCTION TO ADDEVENTLISTENER

Add_EventList();

function Add_EventList() {
    document.getElementById('confirmproduct_button').addEventListener('click', submitProduct);
}

//AFFICHER LES INFORMATIONS DU PRODUIT SELECTIONNE PAR L'UTILISATEUR

getProductChoosen();

function getProductChoosen() {

    let queryParams = new URLSearchParams(window.location.search);
    let _id = queryParams.get("id");

    fetch('http://localhost:3000/api/cameras' + '/' + _id).then(response => response.json()).then(response => detailofproduct(response))
        .catch(function (error) {
            console.log('there was a problem with the request : ' + error.message)
        })
}

//AFFICHER LES DETAILS DU PRODUIT SELECTIONNÉ

function detailofproduct(Product) {

let HTMLProductlist = `<div class="productlist">
        <h2>${Product.name}</h2>
        <p class="text-center">${Product.description}</p>
        <p class="priceproductslist">Price of the article: ${Product.price / 100 + '.' + Product.price % 100} euros</p>
        <img class="imageproduct" src="${Product.imageUrl}">
        <p class="priceproductslist">Options for this article:</p>
        <div class="btn-group">
        <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Options
        </button>
        <div class="dropdown-menu" id="options">
            
            </div>
        </div>`
            
            document.getElementById('productchoosen').innerHTML = HTMLProductlist;
            getoptions(Product)
}

//AFFICHER LES DIFFERENTES OPTIONS DU PRODUIT

function getoptions(Product) {
    let optionsection = document.getElementById("options");
   
    for (let i = 0; i < Product.lenses.length; i++) {
        let newOption = document.createElement('a');
        newOption.setAttribute('href', "#");
        newOption.className = 'dropdown-item';
        newOption.innerText = Product.lenses[i];

        optionsection.append(newOption);
        }
}

//ENREGISTRER UN PRODUIT DANS LA BASE LOCALHOST

async function submitProduct() {
    event.preventDefault();
    let queryParams = new URLSearchParams(window.location.search);
    let _id = queryParams.get("id");
    
    fetch('http://localhost:3000/api/cameras' + '/' + _id).then(response => response.json()).then(response => pushproduct(response))
        .catch(function (error) {
            console.log('there was a problem with the fetch : ' + error.message)
        })
}

//AJOUTER LE PRODUIT A L'ARRAY PANIER

function pushproduct(Myproduct) {

var Panier = JSON.parse(window.localStorage.getItem('Cart'));
if (Panier === null) {var Panier = []};

Panier.push(Myproduct);

window.localStorage.setItem('Cart', JSON.stringify(Panier));
setTimeout(window.location.replace("Cart.html"), 5000);
}
