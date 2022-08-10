let pesquisar = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome");
let vitrine = document.querySelector(".campoBuscaPorNome");
let input = document.querySelector(".campoBuscaPorNome");
let ul = document.querySelector(".ul-produtos");
let buttons = document.querySelector("#botoesContainer");
let products = input.value;
let result = [];
let carrinho = document.querySelector(".add-carrinho");

function lista(produto) {
  let li = document.createElement("li");
  li.classList.add("li-produtos");
  li.setAttribute("id", produto.id);
  let img = document.createElement("img");
  let h3 = document.createElement("h3");
  let span = document.createElement("span");
  let p = document.createElement("p");
  let button = document.createElement("button");
  button.classList.add("button-comprar");
  let div = document.createElement("div");
  div.classList.add("mini-container");
  let ol = document.createElement("ol");
  for (let products of produto.componentes) {
    let li1 = document.createElement("li");
    li1.classList.add("li-produto");
    li1.innerText = products;
    ol.append(li1);
  }
  img.src = produto.img;
  img.alt = produto.nome;
  h3.innerText = produto.nome;
  span.innerText = `R$ ${produto.preco},00`;
  p.innerText = produto.tipo;
  button.innerText = "Comprar";
  div.append(span, button);
  li.append(img, h3, p, ol, div);
  return li;
}
function listaDoCarrinho(produto, indice) {
  let li = document.createElement("li");
  li.classList.add("li-produtos-carrinho");
  li.setAttribute("id", produto.id);
  let img = document.createElement("img");
  let h3 = document.createElement("h3");
  let span = document.createElement("span");
  let p = document.createElement("p");
  let button = document.createElement("button");
  button.classList.add("button-remover");
  let div = document.createElement("div");
  div.classList.add("div-container");
  let div2 = document.createElement("div");
  div2.classList.add("div-container2");
  let div3 = document.createElement("div");
  div3.classList.add("div-container3");
  img.src = produto.img;
  img.alt = produto.nome;
  h3.innerText = produto.nome;
  span.innerText = `R$ ${produto.preco},00`;
  p.innerText = produto.tipo;
  button.innerText = "X";
  button.id = indice
  div.append(h3, button);
  div2.append(p, span);
  div3.append(div, div2);
  li.append(img, div3);
  return li;
}
function itens(arrayProdutos) {
  for (let i in arrayProdutos) {
    objeto = arrayProdutos[i];
    ul.append(lista(objeto));
  }
}
function itensDoCarrinho(productCarrinho) {
  carrinho.innerHTML = "";
  for (let i in productCarrinho) {
    let obj = productCarrinho[i]
    carrinho.append(listaDoCarrinho(obj, i));
  }
}
itens(produtos);
buttons.addEventListener("click", (event) => {
  let elemento = event.target;
  let arrayPanificadora = [];
  let arrayHorti = [];
  let arrayFrutas = [];
  if (elemento.id == "panificadora") {
    console.log(elemento.textContent);
    for (let i in produtos) {
      let produto = produtos[i];
      if (produto.tipo == "Pães") {
        arrayPanificadora.push(produto);
        ul.innerHTML = "";
        itens(arrayPanificadora);
      }
    }
  } else if (elemento.id == "hortifruti") {
    for (let i in produtos) {
      let produto = produtos[i];
      if (produto.tipo == "fruta") {
        arrayHorti.push(produto);
        ul.innerHTML = "";
        itens(arrayHorti);
      }
    }
  } else if (elemento.id == "leite") {
    for (let i in produtos) {
      let produto = produtos[i];
      if (produto.tipo == "Leite") {
        arrayFrutas.push(produto);
        ul.innerHTML = "";
        itens(arrayFrutas);
      }
    }
  } else {
    ul.innerHTML = "";
    itens(produtos);
  }
});
pesquisar.addEventListener("click", (event) => {
  let one = event.target;
  result = [];
  if (one.tagName == "BUTTON") {
    let texto = vitrine.value.toLowerCase();
    console.log(texto);
    produtos.forEach((element) => {
      if (element.nome.toLowerCase().includes(texto)) {
        result.push(element);}
    });
  }
  ul.innerHTML = "";
  itens(result);
});
function totalProducts(array) {
  let totalProdutos = document.querySelector(".carrinho-total");
  let total = 0;
  array.forEach((element) => (total += element.preco));
  totalProdutos.innerHTML = `<p>${array.length}R$ ${total},00</p>`
}
addEventListener("eventu", (event) => {
  console.log(event);
  ul.innerHTML = "";
  result = [];
  let texto = vitrine.value.toLowerCase();
  produtos.forEach((element) => {
    if (element.nome.toLowerCase().includes(texto)) {
      result.push(element);
    }
  });
  itens(result);
});
let productCarrinho = [];
ul.addEventListener("click", (event) => {
  let one = event.target;
  let tipo2 = produtos;
  let especific = one.closest("li");
  let id = especific.id;
  if (one.tagName == "BUTTON") {
    for (let i in tipo2) {
      let obj = tipo2[i];
      if (id == tipo2[i].id) {  
        productCarrinho.push(obj);
      }
    }
  }
  if (productCarrinho.length > 0) {
    itensDoCarrinho(productCarrinho);
  }
  totalProducts(productCarrinho);
});
let ulCarrinho = document.querySelector(".add-carrinho");
ulCarrinho.addEventListener("click", (event) => {
  let one = event.target;
  let atributos = one.closest("button");
  let id = atributos.id;
  if (one.tagName == "BUTTON") {
    console.log(id)
    productCarrinho.splice(id, 1)}
  if (productCarrinho.length >= 0) {
    itensDoCarrinho(productCarrinho);
    totalProducts(productCarrinho)
  }
});
