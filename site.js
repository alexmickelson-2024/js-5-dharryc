import { products } from "./products.js"

//setup card making function
const totalPriceNode = document.getElementById("amount")
totalPriceNode.textContent = "0.00"
const cardArticleElement = document.getElementById("products-container")
cardArticleElement.addEventListener("drop", (ev) => {
    ev.preventDefault()
    const cartListNode = document.getElementById(ev.dataTransfer.getData("id")).parentElement
    const currentProductNode = document.getElementById(ev.dataTransfer.getData("id"))
    let nonCopyNode = document.getElementById(`${currentProductNode.childNodes[1].childNodes[0].textContent}`)
    if(nonCopyNode === null){
        nonCopyNode = MakeCards(products.find((product) => product.title === `${currentProductNode.childNodes[1].childNodes[0].textContent}`))
        nonCopyNode.childNodes[1].childNodes[3].textContent = 0
        cardArticleElement.appendChild(nonCopyNode)
    }
    currentProductNode.childNodes[1].childNodes[3].textContent --
    if (cartListNode.id === "cartList") {
        totalPriceNode.textContent = (Number(totalPriceNode.textContent) - Number(currentProductNode.childNodes[1].childNodes[2].textContent)).toFixed(2)
    }
    if (Number(currentProductNode.childNodes[1].childNodes[3].textContent) === 0) {
        cartListNode.removeChild(currentProductNode)
    }
    nonCopyNode.childNodes[1].childNodes[3].textContent ++
})
const cartNode = document.getElementById("cartList")
cartNode.addEventListener("dragover", (ev) => {
    ev.preventDefault()
})
cartNode.addEventListener("drop", (ev) => {
    ev.preventDefault()
    if (!ev.dataTransfer.getData("id").includes("-copy")) {

        const itemNode = document.getElementById(ev.dataTransfer.getData("id"))
        totalPriceNode.textContent = (Number(totalPriceNode.textContent) + Number(itemNode.childNodes[1].childNodes[2].textContent)).toFixed(2)
        const myProduct = productList.find((product) => product.title === ev.dataTransfer.getData("id"))
        const itemCopy = MakeCards(myProduct)
        itemCopy.id = `${myProduct.title}-copy`
        itemCopy.childNodes[1].childNodes[3].textContent = 1
        if (document.getElementById(`${myProduct.title}-copy`) == null) {
            cartNode.appendChild(itemCopy)
        }
        else {
            const itemQuantity = document.getElementById(`${myProduct.title}-copy`).childNodes[1].childNodes[3]
            itemQuantity.textContent = Number(itemQuantity.textContent) + Number(1)
        }
        itemNode.childNodes[1].childNodes[3].textContent = Number(itemNode.childNodes[1].childNodes[3].textContent) - 1
        if (Number(itemNode.childNodes[1].childNodes[3].textContent) === 0) {
            itemNode.parentNode.removeChild(itemNode)
        }
    }
})

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