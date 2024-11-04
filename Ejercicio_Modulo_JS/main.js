let shoppingList = {};

function paintProducts() {
  let $container = document.querySelector("#productsContainer");
  for (const product of products) {
    let $pill = document.createElement('div');
    $pill.classList.add("product-pill");
    $pill.dataset.id = product.id;
    $pill.dataset.name = product.name;
    $pill.dataset.price = product.price;
    $pill.dataset.stock = product.stock;
    $pill.innerHTML = `
          <div class="product-pill-container">
            <div class="product-header">
                <img src="${product.img}" alt="">
            </div>
            <div class="product-body">
                <h2 class="product-name">${product.name}</h2>
                <div class="product-description">${product.description}</div>
            </div>
            <div class="product-price">
              Precio: ${product.price}€
            </div>
            <div class="product-stock">
              Stock: ${product.stock}
            </div>
            <div class="product-button">
              <button class="add-to-cart">Agergar al carrito</button>
            </div>
          </div>
    `;
    let $btn = $pill.querySelector("button.add-to-cart")
    $btn.addEventListener("click", addItemToShoppingList);
    $container.appendChild($pill);
  }  

}

function toggleShoppingList() {
  
  let $shoppingListContainer = document.querySelector("#shoppingListContainer");
  $shoppingListContainer.classList.toggle("show");
}

function addItemToShoppingList() {
  let $pill = this.closest(".product-pill");
  let id = $pill.dataset.id;
  let name = $pill.dataset.name;
  let price = $pill.dataset.price;
  let stock = $pill.dataset.stock;

  if(!shoppingList.hasOwnProperty(id)){

    shoppingList[id] = {
      id: parseInt(id),
      name: name,
      price: parseInt(price),
      count: 0,
      stock: parseInt(stock)
    };
  }
  changeItemCountFromShoppingList(id, 1);

  refreshShoppingList();

}

function refreshShoppingList() {
  let $shoppingListBody = document.querySelector("#shoppingList tbody");
  $shoppingListBody.innerHTML = "";

  let totalPrice = 0;

  for (const productId in shoppingList) {
    let product = shoppingList[productId];
    let $tr = document.createElement("tr");
    $tr.dataset.id = product.id;
    $tr.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}€</td>
      <td>${product.count}</td>
      <td>${product.count * product.price}</td>
      <td>
        <button class="add-item-to-cart fa-solid fa-plus"><button>
        <button class="remove-item-from-cart fa-solid fa-minus"></button>
      </td>
    `
    let $addBtn = $tr.querySelector(".add-item-to-cart");
    let $removeBtn = $tr.querySelector(".remove-item-from-cart");

    $addBtn.addEventListener("click", addItemToShoppingListFromCart);
    $removeBtn.addEventListener("click", removeItemFromShoppingListFromCart);

    totalPrice += product.count * product.price;
    $shoppingListBody.appendChild($tr);
  }

  let $totalPrice = document.querySelector("#totalPrice");
  $totalPrice.textContent = totalPrice  + "€";
}

function addItemToShoppingListFromCart() {
  let $row = this.closest("tr");
  let productId = parseInt($row.dataset.id);

  changeItemCountFromShoppingList(productId, 1);

}

function removeItemFromShoppingListFromCart() {
  let $row = this.closest("tr");
  let productId = parseInt($row.dataset.id);

  changeItemCountFromShoppingList(productId, -1);
}

function changeItemCountFromShoppingList(productId, change) {
  if(!shoppingList.hasOwnProperty(productId)){
    console.error("The product is not exist in arrayList");
    return;
  }

  if(shoppingList[productId].count + change > shoppingList[productId].stock){
    alert("Estas excediendo el stock");
  }else{
    shoppingList[productId].count += change;
    if(shoppingList[productId].count <= 0){
      delete shoppingList[productId];
    }
  }


  refreshShoppingList();
}

function doOrder() {
  if(Object.keys(shoppingList).length === 0){
    alert("El carrito esta vacio");
  }else{
    alert("Compra realizada");
    shoppingList = {};
    refreshShoppingList();
  }
}

paintProducts();

let $toggleShoppingListBtn = document.querySelector("#toggleShoppingListBtn");
$toggleShoppingListBtn.addEventListener("click", toggleShoppingList);

let $doOrderBtn = document.querySelector("#doOrderBtn");
$doOrderBtn.addEventListener("click", doOrder);

