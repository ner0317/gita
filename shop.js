let productContainer = document.querySelector(".home__products .row")

async function getAllProducts() {
	let res = await fetch("https://662c0542de35f91de15a3ca9.mockapi.io/products")
	let data = await res.json()
	return data
}

getAllProducts().then(data => renderProducts(data))

function renderProducts(prodcuts) {
	productContainer.innerHTML = ""

	prodcuts.forEach(product => {
		productContainer.innerHTML += `
        <div class="home__products-item">
        <img
            src="${product.image}"
            alt="">
        <h3>${product.name}</h3>
        <p class="home__products-descr">${product.description}</p>
        <p class="home__products-price">${product.price} USD</p>
        <button class="add_to_cart">Add to cart</button>
    </div>
		`
	})
}

//let addItemToCart = document.querySelectorAll(".add_to_cart")

//function add_item(){

//}
