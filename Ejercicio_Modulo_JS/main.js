const products = [
    { id: 1, name: "Peperomia caperata Rosso Mini", img: "./img/peperomia-caperata-rosso-mini.jpg", description: "Le gusta crecer en espacios de sombra o semisombra, mantener un sustrato húmedo.", price: 7, stock: 4 },
    { id: 2, name: "Ceropegia Woodii", img: "./img/ceropegia-woodii.jpg", description: "Sus hojas en forma de corazón y su crecimiento la hacen ser la planta colgante más deseada.", price: 10, stock: 5 },
    { id: 3, name: "musgo para terrario", img: "./img/musgo-para-terrario.jpg", description: "Muy exigente respecto al riego, necesita altos niveles de humedad para vivir feliz.", price: 5, stock: 4 },
    { id: 4, name: "baobab mini", img: "./img/baobab-mini.jpg", description: "Sin duda, el árbol más exótico que puedes encontrar ¡y ahora disponible en tamaño mini!", price: 5, stock: 7 },
    { id: 5, name: "senecio rowleyanus", img: "./img/senecio-rowleyanus.jpg", description: "Esta mini es bastante relajada y no pide demasiado: solo un poco de luz indirecta y riegos ocasionales.", price: 4, stock: 8 },
    { id: 6, name: "asparagus plumosos mini", img: "./img/asparagus-plumosos-mini.jpg", description: "Esta planta trepadora es una planta perfecta para espacios de poca luz. Necesita riegos frecuentes.", price: 9, stock: 7 }
    // Más productos...
  ];

function paintProducts() {
  let $container = document.querySelector("#productsContainer");
  for (const product of products) {
    let $pill = document.createElement('div');
    $pill.classList.add("product-pill");

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
            <div class="product-button">
              <button>Agergar al carrito</button>
            </div>
          </div>
    `;

    $container.appendChild($pill);

  }  

}

function toggleShoppingList() {
  
  let $shoppingListContainer = document.querySelector("#shoppingListContainer");
  $shoppingListContainer.classList.toggle("show");
}

paintProducts();

let $toggleShoppingListBtn = document.querySelector("#toggleShoppingListBtn");
$toggleShoppingListBtn.addEventListener("click", toggleShoppingList);





