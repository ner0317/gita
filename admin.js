let login = "ner0"
let password = "ner031744"

let authScreen = document.querySelector(".auth")
let authForm = document.querySelector(".auth form")
let authFormLogin = authForm.querySelector("#login")
let authFormPassword = authForm.querySelector("#password")
let authFormError = authForm.querySelector("p")
let productContainer = document.querySelector(".home__products .row")

let addProdBtn = document.querySelector("#add-prod")

let modal = document.querySelector(".modal ")
let modalClose = document.querySelector(".modal__close ")
let modalTitle = document.querySelector(".modal h2")
let modalInputs = document.querySelectorAll(".modal input")
let modalForm = document.querySelector(".modal ")

let modalOption
let prodId

authForm.addEventListener("submit", (event) => {
	event.preventDefault()

	if (authFormLogin.value != login || authFormPassword.value != password) {
		authFormError.innerHTML = 'Incorrect login or password'
		setTimeout(() => {
			authFormError.innerHTML = ""
		}, 3000)
		return
	} else {
		authScreen.style.display = "none"
	}
})

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
			<div class="home__products-item" data-id="${product.id}">
				<img
					src="${product.image}"
					alt="">
				<h3>${product.name}</h3>
				<p class="home__products-descr">${product.description}</p>
				<p class="home__products-price">${product.price} USD</p>
				<button class="change-btn">Change</button>
				<button class="delete-btn">Delete</button>
			</div>
		`
	})
}

function openModal() {
	modal.classList.remove("hide")
}

function closeModal() {
	modal.classList.add("hide")
	modalInputs.forEach(inp => inp.value = "")
}

addProdBtn.addEventListener("click", () => {
	modalOption = "Add"
	modalTitle.innerHTML = "Add Product"
	openModal()
})
modalClose.addEventListener("click", closeModal)

async function addProductToDB(newProd) {
	let res = await fetch('https://662c0542de35f91de15a3ca9.mockapi.io/products', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(newProd)
	})
}

modalForm.addEventListener("submit", (event) => {
	event.preventDefault()

	let newProd = {
		type: modalInputs[0].value,
		image: modalInputs[1].value,
		name: modalInputs[2].value,
		description: modalInputs[3].value,
		price: +modalInputs[4].value
	}

	if (modalOption === "Add") {
		addProductToDB(newProd).then(() => {
			getAllProducts().then(data => renderProducts(data))
		})
	}

	if (modalOption === "Change") {
		editProductInDB(prodId, newProd).then(() => {
			getAllProducts().then(data => renderProducts(data))
		})
	}

	closeModal()
})

productContainer.addEventListener("click", (event) => {
	prodId = event.target.parentElement.dataset.id

	if (event.target.closest(".delete-btn")) {
		deleteProductFromDB(prodId).then(() => {
			getAllProducts().then(data => renderProducts(data))
		})
	}

	if (event.target.closest(".change-btn")) {
		modalOption = "Change"
		modalTitle.innerHTML = "Change Product"
		openModal()
		getProduct(prodId).then(data => {
			modalInputs[0].value = data.type
			modalInputs[1].value = data.image
			modalInputs[2].value = data.name
			modalInputs[3].value = data.description
			modalInputs[4].value = data.price
		})
	}
})

async function deleteProductFromDB(id) {
	let res = await fetch(`https://662c0542de35f91de15a3ca9.mockapi.io/products/${id}`, {
		method: 'DELETE'
	})
}


async function getProduct(id) {
	let res = await fetch(`https://662c0542de35f91de15a3ca9.mockapi.io/products/${id}`)
	let data = await res.json()
	return data
}

async function editProductInDB(id, prod) {
	let res = await fetch(`https://662c0542de35f91de15a3ca9.mockapi.io/products/${id}`, {
		method: 'PUT',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(prod)
	})
}

