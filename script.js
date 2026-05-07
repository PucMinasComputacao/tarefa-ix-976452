const data = {
  produtos: [
    {
      id: 1,
      nome: "iPhone 15",
      preco: 6999.90,
      categoria: "Celulares",
      imagem: "https://cdn-icons-png.flaticon.com/512/0/191.png",
      descricao: "Smartphone Apple com câmera avançada.",
      emEstoque: true
    },

    {
      id: 2,
      nome: "Galaxy S24",
      preco: 5499.90,
      categoria: "Celulares",
      imagem: "https://cdn-icons-png.flaticon.com/512/5977/5977575.png",
      descricao: "Celular Samsung com alto desempenho.",
      emEstoque: true
    },

    {
      id: 3,
      nome: "Notebook Dell",
      preco: 4299.90,
      categoria: "Notebooks",
      imagem: "https://cdn-icons-png.flaticon.com/512/179/179386.png",
      descricao: "Notebook ideal para estudos e trabalho.",
      emEstoque: false
    },

    {
      id: 4,
      nome: "Mouse Gamer",
      preco: 199.90,
      categoria: "Acessórios",
      imagem: "https://cdn-icons-png.flaticon.com/512/2881/2881142.png",
      descricao: "Mouse RGB com alta precisão.",
      emEstoque: true
    },

    {
      id: 5,
      nome: "Teclado Mecânico",
      preco: 349.90,
      categoria: "Acessórios",
      imagem: "https://cdn-icons-png.flaticon.com/512/3128/3128313.png",
      descricao: "Teclado mecânico para gamers.",
      emEstoque: true
    },

    {
      id: 6,
      nome: "PlayStation 5",
      preco: 3999.90,
      categoria: "Games",
      imagem: "https://cdn-icons-png.flaticon.com/512/871/871385.png",
      descricao: "Console de última geração.",
      emEstoque: true
    },

    {
      id: 7,
      nome: "Xbox Series X",
      preco: 3899.90,
      categoria: "Games",
      imagem: "https://cdn-icons-png.flaticon.com/512/732/732228.png",
      descricao: "Console poderoso da Microsoft.",
      emEstoque: false
    },

    {
      id: 8,
      nome: "Monitor LG UltraWide",
      preco: 1299.90,
      categoria: "Acessórios",
      imagem: "https://cdn-icons-png.flaticon.com/512/3474/3474360.png",
      descricao: "Monitor ultrawide para produtividade.",
      emEstoque: true
    }
  ]
};


// getElementById

const productList = document.getElementById("product-list");

const productDetails = document.getElementById("product-details");


// querySelector

const searchInput = document.querySelector("#search");

const categorySelect = document.querySelector("#category");

const renderButton = document.querySelector("#btnRender");


// formatPrice

function formatPrice(preco) {

  return preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

}


// createProductCard

function createProductCard(produto) {

  const card = document.createElement("div");

  card.classList.add("card");

  card.setAttribute("data-id", produto.id);

  card.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";

  const imagem = document.createElement("img");

  imagem.setAttribute("src", produto.imagem);

  const titulo = document.createElement("h3");

  titulo.textContent = produto.nome;

  const preco = document.createElement("p");

  preco.textContent = formatPrice(produto.preco);

  const categoria = document.createElement("p");

  categoria.textContent = produto.categoria;

  const detailsBtn = document.createElement("button");

  detailsBtn.textContent = "Ver detalhes";

  detailsBtn.classList.add("details-btn");

  detailsBtn.addEventListener("click", () => {

    showProductDetails(produto);

  });

  const highlightBtn = document.createElement("button");

  highlightBtn.textContent = "Destacar";

  highlightBtn.classList.add("highlight-btn");

  highlightBtn.addEventListener("click", () => {

    card.classList.toggle("highlight");

  });

  card.appendChild(imagem);

  card.appendChild(titulo);

  card.appendChild(preco);

  card.appendChild(categoria);

  card.appendChild(detailsBtn);

  card.appendChild(highlightBtn);

  return card;
}
function renderProducts(produtos) {

  productList.innerHTML = "";

  produtos.forEach((produto) => {

    const card = createProductCard(produto);

    productList.appendChild(card);

  });

  // querySelectorAll obrigatório

  const todosCards = document.querySelectorAll(".card");

  todosCards.forEach((card) => {

    console.log("Card renderizado:", card.dataset.id);

    card.style.transition = "0.3s";

  });

}
function renderCategories() {

  const categorias = data.produtos.map(

    (produto) => produto.categoria

  );

  const categoriasUnicas = [...new Set(categorias)];

  categoriasUnicas.forEach((categoria) => {

    const option = document.createElement("option");

    option.value = categoria;

    option.textContent = categoria;

    categorySelect.appendChild(option);

  });

}
function showProductDetails(produto) {

  productDetails.innerHTML = `
  
    <img src="${produto.imagem}" alt="${produto.nome}">

    <h2>${produto.nome}</h2>

    <p>
      <strong>Preço:</strong>
      ${formatPrice(produto.preco)}
    </p>

    <p>
      <strong>Categoria:</strong>
      ${produto.categoria}
    </p>

    <p>
      <strong>Estoque:</strong>
      ${produto.emEstoque ? "Disponível" : "Indisponível"}
    </p>

    <p>
      <strong>Descrição:</strong>
      ${produto.descricao}
    </p>

  `;
}
function filterProducts() {

  const textoBusca = searchInput.value.toLowerCase();

  const categoriaSelecionada = categorySelect.value;

  const produtosFiltrados = data.produtos.filter((produto) => {

    const nomeCorresponde =

      produto.nome.toLowerCase().includes(textoBusca);

    const categoriaCorresponde =

      categoriaSelecionada === "Todas" ||

      produto.categoria === categoriaSelecionada;

    return nomeCorresponde && categoriaCorresponde;

  });

  renderProducts(produtosFiltrados);

}
// Eventos

searchInput.addEventListener("input", filterProducts);

categorySelect.addEventListener("change", filterProducts);

renderButton.addEventListener("click", () => {

  renderProducts(data.produtos);

});


// Inicialização

renderCategories();

renderProducts(data.produtos);