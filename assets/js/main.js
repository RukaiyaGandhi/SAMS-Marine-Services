/* =========================================================
   SAMS MARINE SERVICES
   MAIN JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   PRELOADER
   ========================================================= */

window.addEventListener("load", function () {

    const preloader =
        document.querySelector(".preloader");

    if (preloader) {

        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";

        setTimeout(function () {

            preloader.remove();

        }, 500);

    }

});


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    setCurrentYear();

    initSmoothLinks();

});


/* =========================================================
   CURRENT YEAR
   ========================================================= */

function setCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "#currentYear, [data-current-year]"
        );

    if (!yearElements.length) {
        return;
    }

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach(function (element) {

        element.textContent = currentYear;

    });

}


/* =========================================================
   SMOOTH INTERNAL LINKS
   ========================================================= */

function initSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]:not([href="#"])'
        );

    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (!targetId) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header =
                document.querySelector(".site-header");

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });

}