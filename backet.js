function savedata(array){
    localStorage.setItem('gita-cart',JSON.stringify(array))
}
function getdata(){
    let data = JSON.parse(localStorage.getItem('gita-cart'))
    if(data){
        cartArray = data
        rendercart(cartArray)
    }
}
let productContainer = document.querySelector(".home__products .row")
let cartArray = []

function rendercart(data){
    productContainer.innerHTML = ""
    data.forEach(element => {
        productContainer.innerHTML += `<div class="home__products-item" data-id='${element.cardId}'>${element.card}</div>`
    });
    let btns = productContainer.querySelectorAll('button')
    btns.forEach(element => element.innerHTML= "Remove")
}
getdata()
productContainer.addEventListener("click",(event)=>{
    let btn = event.target.closest(".add_to_cart")
    if(btn){
        let cardId = btn.parentElement.dataset.id
        let index = cartArray.findIndex(element => element.id == cardId)
        cartArray.splice(index,1)
        rendercart(cartArray)
        savedata(cartArray)
    }
})