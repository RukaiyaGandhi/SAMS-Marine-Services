/* =========================================================
   SAMS MARINE SERVICES
   NAVIGATION JAVASCRIPT
   ========================================================= */

"use strict";


document.addEventListener("DOMContentLoaded", function () {

    initMobileNavigation();
    initActiveNavigation();

});


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function initMobileNavigation() {

    const toggle =
        document.getElementById("mobileToggle");

    const navMenu =
        document.querySelector(".nav-menu");

    if (!toggle || !navMenu) {
        return;
    }


    toggle.setAttribute(
        "aria-expanded",
        "false"
    );


    toggle.addEventListener("click", function (event) {

        event.stopPropagation();

        if (
            navMenu.classList.contains("active")
        ) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    });


    /* Close after clicking a navigation link */

    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeMobileMenu();

        });

    });


    /* Close when clicking outside */

    document.addEventListener("click", function (event) {

        if (
            !navMenu.contains(event.target) &&
            !toggle.contains(event.target)
        ) {

            closeMobileMenu();

        }

    });


    /* Close with Escape */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    });


    /* Close when returning to desktop */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 991) {

            closeMobileMenu();

        }

    });

}


/* =========================================================
   OPEN MOBILE MENU
   ========================================================= */

function openMobileMenu() {

    const toggle =
        document.getElementById("mobileToggle");

    const navMenu =
        document.querySelector(".nav-menu");

    if (!toggle || !navMenu) {
        return;
    }

    navMenu.classList.add("active");

    toggle.classList.add("active");

    toggle.setAttribute(
        "aria-expanded",
        "true"
    );

    document.body.classList.add(
        "mobile-menu-open"
    );

}


/* =========================================================
   CLOSE MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    const toggle =
        document.getElementById("mobileToggle");

    const navMenu =
        document.querySelector(".nav-menu");

    if (!toggle || !navMenu) {
        return;
    }

    navMenu.classList.remove("active");

    toggle.classList.remove("active");

    toggle.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "mobile-menu-open"
    );

}


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );

    if (!navLinks.length) {
        return;
    }


    let currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    if (
        !currentPage ||
        currentPage === "/"
    ) {

        currentPage = "index.html";

    }


    navLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }


        /*
         * Ignore anchor links
         */

        if (href.startsWith("#")) {
            return;
        }


        const linkPage =
            href
                .split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();


        if (
            linkPage === currentPage
        ) {

            link.classList.add("active");

        } else {

            link.classList.remove("active");

        }

    });

}