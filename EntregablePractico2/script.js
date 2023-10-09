window.onload = function() {

const cartMenu = document.querySelector(".cart-menu");
const cartButton = document.querySelector(".cart-button");

const menuButton = document.querySelector(".hamburger");
const menuBar = document.querySelector(".sidebar")

menuButton.addEventListener("click", () => {
    menuBar.classList.toggle("visible");
})

cartButton.addEventListener("click", () => {
    cartMenu.classList.toggle("visible");
})
}