import { products } from "./products.js"

//setup card making function
document.getElementById("amount").textContent = "0.00"
const productsNode = document.getElementById("products-container")
productsNode.addEventListener("drop", (ev) => {
    ev.preventDefault()
    console.log(document.getElementById(ev.dataTransfer.getData("id")).childNodes[1].childNodes[2].textContent)
    if (document.getElementById(ev.dataTransfer.getData("id")).parentElement.id === "cartList") {
        document.getElementById("amount").textContent = Number(document.getElementById("amount").textContent) - Number(document.getElementById(ev.dataTransfer.getData("id")).childNodes[1].childNodes[2].textContent)
        document.getElementById(ev.dataTransfer.getData("id")).parentElement.removeChild(document.getElementById(ev.dataTransfer.getData("id")))
    }
})
const total = document.getElementById("amount")
const cartNode = document.getElementById("cartList")
cartNode.addEventListener("dragover", (ev) => {
    ev.preventDefault()
})
cartNode.addEventListener("drop", (ev) => {
    ev.preventDefault()
    document.getElementById("amount").textContent = Number(document.getElementById("amount").textContent) + Number(document.getElementById(ev.dataTransfer.getData("id")).childNodes[1].childNodes[2].textContent)
    const myProduct = productList.find((product) => product.title === ev.dataTransfer.getData("id"))
    const itemCopy = MakeCards(myProduct)
    itemCopy.id = `${myProduct.title}-copy`
    if (document.getElementById(`${myProduct.title}-copy`) == null) {
        cartNode.appendChild(itemCopy)
    }
    document.getElementById(ev.dataTransfer.getData("id")).childNodes[1].childNodes[3].textContent = Number(document.getElementById(ev.dataTransfer.getData("id")).childNodes[1].childNodes[3].textContent) - 1
    if(Number(document.getElementById(ev.dataTransfer.getData("id")).childNodes[1].childNodes[3].textContent) === 0)
        document.getElementById(ev.dataTransfer.getData("id")).parentNode.removeChild(document.getElementById(ev.dataTransfer.getData("id")))
})

const cardArticleElement = document.getElementById("products-container")
const productList = products.map(a => a);
const availibleProducts = document.createElement("h2")
availibleProducts.textContent = "Availible Products"

function MakeCards(product) {
    const cardContainerNode = document.createElement("div")
    cardContainerNode.classList.add("card")
    cardContainerNode.id = product.title
    cardContainerNode.setAttribute("draggable", true)
    cardContainerNode.addEventListener("dragstart", (ev) => {
        ev.dataTransfer.setData("id", ev.target.id)
    })
    cardContainerNode.addEventListener("dragover", (ev) => {
        ev.preventDefault()
    })
    const imgContainer = document.createElement("div")
    imgContainer.classList.add("card-img")
    imgContainer.style.backgroundImage = `url('${product.image}')`
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
productList.forEach((item) => { cardArticleElement.appendChild(MakeCards(item)) })