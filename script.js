function fetchData() {
    const apiUrl = "https://fakestoreapi.com/products";

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            displayProdutos(data);
            displayProdutosMaisVistos(data);
            addProdutosCarousel(data);
        })
        .catch((error) => {
            console.error("Ocorreu um erro:", error);
        });
}

function displayProdutos(produtos) {
    const produtosContainer = document.querySelector(
        ".row .col-lg-8 .card-body .row"
    );

    produtosContainer.innerHTML = "";

    produtos.forEach((produto) => {
        const produtoCard = document.createElement("div");
        produtoCard.classList.add("col-md-4", "mb-4");
        const titulo = produto.title.split(" ").slice(0, 2).join(" ");
        produtoCard.innerHTML = `
        <div class="card d-flex justify-content-center align-items-center" style="height: 250px;">
          <img class="card-img-top pt-2" style="height: 100px; width: 100px; object-fit: contain;" src="${
              produto.image
          }" alt="${produto.title}" />
          <div class="card-body">
            <h5 class="card-title">${titulo}</h5>
            <p class="card-text">R$ ${produto.price.toFixed(2)}</p>
            <button class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#produtoModal${
                produto.id
            }">Ver</button>
          </div>
        </div>
  
        <div class="modal fade" id="produtoModal${
            produto.id
        }" tabindex="-1" aria-labelledby="produtoModal${
            produto.id
        }Label" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="produtoModal${produto.id}Label">${
            produto.title
        }</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <img class="card-img-top" style="height: 200px; width: 200px; object-fit: contain;" src="${
                    produto.image
                }" alt="${produto.title}" />
                <p class="card-text">Preço: R$ ${produto.price.toFixed(2)}</p>
                <p class="card-text">${produto.description}</p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      `;
        produtosContainer.appendChild(produtoCard);
    });
}

function displayProdutosMaisVistos(produtos) {
    const produtosContainer = document.querySelector(
        ".list-group.d-flex.justify-content-center.align-items-center"
    );

    produtosContainer.innerHTML = "";

    const produtosAleatorios = getRandomProducts(produtos, 3);

    produtosAleatorios.forEach((produto) => {
        const produtoItem = document.createElement("a");
        produtoItem.classList.add("list-group-item", "list-group-item-action");
        const titulo = produto.title.split(" ").slice(0, 2).join(" ");
        produtoItem.innerHTML = `
        <img class="card-img-top" style="height: 200px; width: 200px; object-fit: contain;" src="${produto.image}" alt="${produto.title}" />
        <h5 class="card-title">${titulo}</h5>
      `;
        produtosContainer.appendChild(produtoItem);
    });
}

function getRandomProducts(produtos, quantidade) {
    const produtosAleatorios = [];
    const totalProdutos = produtos.length;

    for (let i = 0; i < quantidade; i++) {
        const indiceAleatorio = Math.floor(Math.random() * totalProdutos);
        produtosAleatorios.push(produtos[indiceAleatorio]);
    }

    return produtosAleatorios;
}

function addProdutosCarousel(produtos) {
    const carouselInner = document.querySelector(".carousel-inner");

    carouselInner.innerHTML = "";

    const produtosAleatorios = getRandomProducts(produtos, 3);

    produtosAleatorios.forEach((produto, index) => {
        const produtoItem = document.createElement("div");
        produtoItem.classList.add("carousel-item");

        if (index === 0) {
            produtoItem.classList.add("active");
        }

        const img = document.createElement("img");
        img.classList.add("d-block", "w-100");
        img.style.height = "250px";
        img.style.width = "250px";
        img.style.objectFit = "contain";
        img.src = produto.image;
        img.alt = produto.title;

        produtoItem.appendChild(img);
        carouselInner.appendChild(produtoItem);
    });
}

fetchData();
