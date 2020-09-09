function Product(pic,name,price){
  this.pic = pic;
  this.name = name;
  this.price =price;
}


const nx310 = new Product("img/nx310.png",'nx 310',70);
const p5 = new Product('img/p5.png','p5',58);
const nsk4100 = new Product('img/nsk4100.jpg','nsk4100',60);
const vsk3000 = new Product('img/vsk3000elite.jpg','vsk3000',44.99)

let products = [];
const nx310 = new Product("img/nx310.png",'nx 310',70);
const p5 = new Product('img/p5.png','p5',58);
const nsk4100 = new Product('img/nsk4100.jpg','nsk4100',60);
const vsk3000 = new Product('img/vsk3000elite.jpg','vsk3000',44.99)
products.push(nx310,p5,nsk4100,vsk3000);


products.forEach(prod=>
    listOfProducts += `
      <tr class="text-center">
        <td><img src=${prod.pic} class="img-fluid img-thumbnail w-50"></td>
        <td class="w-25 align-middle">${prod.name}</td>
        <td class="w-25 align-middle">${prod.price}€</td>
        <td class="w-25 align-middle"><button class="btn btn-info">View</button></td>
      </tr>
      `   
  )
 
document.getElementById('productList').innerHTML = listOfProducts;
}