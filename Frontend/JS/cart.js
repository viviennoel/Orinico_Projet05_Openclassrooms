//FUNCTION TO ADDEVENTLISTENER

Add_EventList();

function Add_EventList() {
    document.getElementById('submitorder').addEventListener('click', OrderPanier);
    document.getElementById('clearbutton').addEventListener('click', ClearAllOrder);
}


//FONCTION DISPLAY PANIER PERMET DE PRÉSENTER LES ARTICLES DU PANIER

DisplayPanier();

function DisplayPanier() {

    //Récupérer un tableau de tous les produits enregistrés dans LocalHost (Panier)

    let ListofOrder = JSON.parse(window.localStorage.getItem('Cart'));
    if (ListofOrder === null) {
        document.getElementById('panierproducts').innerHTML = 'Your cart is empty at the moment';
        document.getElementById('orderform').style.display = 'none';

    } else {
        let HTMLProductlist = "";
        var TotalPrice = 0;
        for (let i = 0; i < ListofOrder.length; i++) {
            HTMLProductlist += `<div class="productlist">
                <h2>${ListofOrder[i].name}</h2>
                <p class="text-center">${ListofOrder[i].description}</p>
                <p class="priceproductslist">Price of the article: ${ListofOrder[i].price / 100 + '.' + ListofOrder[i].price % 100}</p>
                <img class="imageproduct" src="${ListofOrder[i].imageUrl}">
            </div>`
            var TotalPrice = TotalPrice + ListofOrder[i].price;
        }

        document.getElementById('panierproducts').innerHTML = HTMLProductlist;
        TotalPriceEuros(TotalPrice);
    }

    function TotalPriceEuros(TotalPrice) {
        var TotalPriceEuros = TotalPrice / 100 + '.' + TotalPrice % 100;
        DisplayTotalPriceEuros(TotalPriceEuros);
    }

    function DisplayTotalPriceEuros(TotalPriceEuros) {
        let Pricesection = `<h3 class="pricetotal white text-center">The total paid price is : ${TotalPriceEuros}</h3>`
        document.getElementById("pricetotal").innerHTML = Pricesection;
    }
}

//LA FONCTION ORDER PANIER PERMET DE RECEVOIR UN NUMERO D'ORDER DE D'ENVOYER LES DONNEES AU SERVER

function OrderPanier() {
    event.preventDefault();

    var inputOrder = document.getElementsByTagName("input");

    if (inputOrder[0].value && inputOrder[1].value && inputOrder[2].value && inputOrder[3].value && inputOrder[4].value) {
        
        var contact = {
            firstName: inputOrder[0].value,
            lastName: inputOrder[1].value,
            address: inputOrder[2].value,
            city: inputOrder[3].value,
            email: inputOrder[4].value
        }

        let ListofOrder = JSON.parse(window.localStorage.getItem('Cart'));

        var products = [];
        for (let i = 0; i < ListofOrder.length; i++) {
            var _id = products.push(ListofOrder[i]._id);
        }

        let order = { contact, products };

        console.log('order');

        fetch('http://localhost:3000/api/cameras/order', { method: "POST", headers: { 'Content-Type': "application/json" }, body: JSON.stringify(order) }).then(response => response.json()).then(response => confirmorderpress(response))
            .catch(function (error) {
                alert('there was a problem with your order. Please try again later - ERROR: ' + error.message)
            })
    } else {
        console.log('The fields are not filled');
        document.getElementById('msg_empty').innerHTML = "Please fill all the fields in the form";
    }
}

//ENREGISTRER LA REPONSE ET LA COMMANDE DANS LA BASE DE DONNEE LOCALHOST

function confirmorderpress(response) {

    var ConfirmedOrders = JSON.parse(window.localStorage.getItem('ConfirmedOrders'));
    if (ConfirmedOrders === null) { var ConfirmedOrders = [] };

    ConfirmedOrders.push(response);

    window.localStorage.setItem('ConfirmedOrders', JSON.stringify(ConfirmedOrders));
    window.localStorage.removeItem('Cart');
    setTimeout(window.location.replace("confirmationOrder.html"), 5000);
}

//VIDER LE PANIER - TOUT EFFACER

function ClearAllOrder() {
    event.preventDefault();
    window.localStorage.removeItem('Cart');
    setTimeout(window.location.replace("cart.html"), 5000);
}