// Mobile Navigation Toggle Script
const mobileNavToggle = document.getElementById("mobile-nav-toggle");
const nav = document.querySelector("nav");

mobileNavToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});