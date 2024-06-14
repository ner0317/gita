let burgerBtn = document.querySelector(".burger")
let headerMenu = document.querySelector(".menu")

burgerBtn.addEventListener("click", () => {
	burgerBtn.classList.toggle("active")
	headerMenu.classList.toggle("active")
})