const products = [
    { id: 1, name: "Peperomia caperata Rosso Mini", img: "./img/peperomia-caperata-rosso-mini.jpg", description: "Le gusta crecer en espacios de sombra o semisombra, mantener un sustrato húmedo.", price: 7, stock: 4 },
    { id: 2, name: "Ceropegia Woodii", img: "./img/ceropegia-woodii.jpg", description: "Sus hojas en forma de corazón y su crecimiento la hacen ser la planta colgante más deseada.", price: 10, stock: 5 },
    { id: 3, name: "musgo para terrario", img: "./img/musgo-para-terrario.jpg", description: "Muy exigente respecto al riego, necesita altos niveles de humedad para vivir feliz.", price: 5, stock: 4 },
    { id: 4, name: "baobab mini", img: "./img/baobab-mini.jpg", description: "Sin duda, el árbol más exótico que puedes encontrar ¡y ahora disponible en tamaño mini!", price: 5, stock: 7 },
    { id: 5, name: "senecio rowleyanus", img: "./img/senecio-rowleyanus.jpg", description: "Esta mini es bastante relajada y no pide demasiado: solo un poco de luz indirecta y riegos ocasionales.", price: 4, stock: 8 },
    { id: 6, name: "asparagus plumosos mini", img: "./img/asparagus-plumosos-mini.jpg", description: "Esta planta trepadora es una planta perfecta para espacios de poca luz. Necesita riegos frecuentes.", price: 9, stock: 7 }
    // Más productos...
  ];

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



