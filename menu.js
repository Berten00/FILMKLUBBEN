const burger = document.querySelector(".burger");
const nav = document.querySelector("nav");
const header = document.querySelector("header");

burger.addEventListener("click", burgerClick);

function burgerClick() {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
  header.classList.toggle("active");
}
