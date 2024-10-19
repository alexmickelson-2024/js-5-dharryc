import { products } from "./products.js"

//setup card making function

const cardArticleElement = document.getElementById("products-container")
cardArticleElement.replaceChildren();
const productList = products.map(a => a);
console.log(productList)
const availibleProducts = document.createElement("h2")
availibleProducts.textContent = "Availible Products"

function MakeCards(product) {
    const container = document.createElement("div")
    container.classList.add("card")
    container.setAttribute("draggable", true)
    const imgContainer = document.createElement("div")
    imgContainer.classList.add("card-img")
    imgContainer.style.backgroundImage= `url('${product.image}')`
    container.appendChild(imgContainer)
    return container
}





//calling functions




cardArticleElement.appendChild(availibleProducts)
productList.forEach((item) => {cardArticleElement.appendChild(MakeCards(item))})