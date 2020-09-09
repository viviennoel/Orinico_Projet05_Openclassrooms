//CONFIRMATION QUE LA COMMANDE A BIEN ETE ENREGISTREE DANS LA BASE DE DONNEE

confirmationOrder();

function confirmationOrder() {
    let ConfirmOrder = JSON.parse(window.localStorage.getItem('ConfirmedOrders'));
    let latestorder = ConfirmOrder.length - 1;
    console.log(latestorder);

    var TotalPrice = 0;

    let HTMLProductlist = "";
    var TotalPrice = 0;
    for (let i = 0; i < ConfirmOrder[latestorder].products.length; i++) {
        HTMLProductlist += `<div class="productlist">
                <h2>${ConfirmOrder[latestorder].products[i].name}</h2>
                <p class="text-center">${ConfirmOrder[latestorder].products[i].description}</p>
                <p class="priceproductslist">Price of the article: ${ConfirmOrder[latestorder].products[i].price / 100 + '.' + ConfirmOrder[latestorder].products[i].price % 100}</p>
                <img class="imageproduct" src="${ConfirmOrder[latestorder].products[i].imageUrl}">
            </div>`
        var TotalPrice = TotalPrice + ConfirmOrder[latestorder].products[i].price;
    }

    document.getElementById('orderedproducts').innerHTML = HTMLProductlist;
    TotalPriceEurosconfirm(TotalPrice);
}

//FONCTION POUR CONVERTIR LE PRIX TOTAL EN EUROS

function TotalPriceEurosconfirm(TotalPrice) {
    var TotalPriceEuros = TotalPrice / 100 + '.' + TotalPrice % 100;
    DisplayTotalPriceEuros(TotalPriceEuros);
}

//FONCTION POUR AFFICHER LE PRIX TOTAL SUR LA PAGE

function DisplayTotalPriceEuros(TotalPriceEuros) {
    let Pricesection = `<h3 class="pricetotal white text-center">This order of ${TotalPriceEuros} euros have been paid</h3>`
    document.getElementById("orderedproductsprice").innerHTML = Pricesection;
}
