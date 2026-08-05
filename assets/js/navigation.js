const mobileToggle = document.getElementById("mobileToggle");
const navMenu = document.querySelector(".nav-menu");

mobileToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
});