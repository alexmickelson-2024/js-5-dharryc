import { products } from "./products.js"


function dragstart(ev) {
    console.log(ev)
    console.log(ev.target.id)
}
//setup card making function

const cardArticleElement = document.getElementById("products-container")
const productList = products.map(a => a);
const availibleProducts = document.createElement("h2")
availibleProducts.textContent = "Availible Products"

function MakeCards(product) {
    const cardContainerNode = document.createElement("div")
    cardContainerNode.classList.add("card")
    cardContainerNode.id = product.title
    cardContainerNode.setAttribute("draggable", true)
    cardContainerNode.setAttribute("ondragstart", 'dragstart(event)')
    const imgContainer = document.createElement("div")
    imgContainer.classList.add("card-img")
    imgContainer.style.backgroundImage= `url('${product.image}')`
    const cardContent = document.createElement("div")
    cardContent.classList.add("card-content")
    const titleNode = document.createElement("div")
    titleNode.classList.add("card-title")
    titleNode.textContent = product.title
    const descriptionNode = document.createElement("div")
    descriptionNode.classList.add("card-description")
    descriptionNode.textContent = product.description
    const priceNode = document.createElement("div")
    priceNode.classList.add("card-price")
    priceNode.textContent = product.price
    const quantityNode = document.createElement("div")
    quantityNode.classList.add("card-quantity")
    quantityNode.textContent = product.quantity
    cardContent.append(titleNode, descriptionNode, priceNode, quantityNode)    
    cardContainerNode.append(imgContainer, cardContent)
    return cardContainerNode
}



//calling functions

cardArticleElement.replaceChildren();
cardArticleElement.appendChild(availibleProducts)
productList.forEach((item) => {cardArticleElement.appendChild(MakeCards(item))})