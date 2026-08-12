/*==================================================
    SAMS MARINE SERVICES
    -----------------------------------------------
    Navigation JavaScript
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    /*==============================================
        ELEMENTS
    ==============================================*/

    const header = document.querySelector(".site-header");
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");


    /*==============================================
        MOBILE NAVIGATION
    ==============================================*/

    if (mobileToggle && navMenu) {

        mobileToggle.addEventListener("click", function (e) {

            e.stopPropagation();

            const isOpen = navMenu.classList.toggle("active");

            mobileToggle.classList.toggle("active", isOpen);

            mobileToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle(
                "nav-open",
                isOpen
            );

        });


        /*==========================================
            CLOSE MENU WHEN NAV LINK IS CLICKED
        ==========================================*/

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                mobileToggle.classList.remove("active");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove("nav-open");

            });

        });


        /*==========================================
            CLOSE WHEN CLICKING OUTSIDE
        ==========================================*/

        document.addEventListener("click", function (e) {

            if (
                navMenu.classList.contains("active") &&
                !navMenu.contains(e.target) &&
                !mobileToggle.contains(e.target)
            ) {

                navMenu.classList.remove("active");

                mobileToggle.classList.remove("active");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove("nav-open");

            }

        });


        /*==========================================
            ESCAPE KEY
        ==========================================*/

        document.addEventListener("keydown", function (e) {

            if (e.key === "Escape") {

                navMenu.classList.remove("active");

                mobileToggle.classList.remove("active");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove("nav-open");

            }

        });

    }


    /*==============================================
        STICKY / SCROLLED HEADER
    ==============================================*/

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /*==============================================
        ACTIVE NAVIGATION LINK
    ==============================================*/

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase() || "index.html";


    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop()
                .split("#")[0]
                .toLowerCase();


        if (
            linkPage &&
            linkPage === currentPage
        ) {

            link.classList.add("active");

        }

    });


    /*==============================================
        MOBILE DROPDOWN
    ==============================================*/

    const dropdownItems =
        document.querySelectorAll(".nav-item");


    dropdownItems.forEach(function (item) {

        const dropdown =
            item.querySelector(".dropdown-menu");

        const parentLink =
            item.querySelector(":scope > .nav-link");


        if (!dropdown || !parentLink) return;


        parentLink.addEventListener("click", function (e) {

            if (window.innerWidth <= 991) {

                e.preventDefault();

                item.classList.toggle("dropdown-open");

            }

        });

    });


    /*==============================================
        RESET MOBILE MENU ON DESKTOP
    ==============================================*/

    window.addEventListener("resize", function () {

        if (window.innerWidth > 991) {

            if (navMenu) {

                navMenu.classList.remove("active");

            }

            if (mobileToggle) {

                mobileToggle.classList.remove("active");

                mobileToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

            document.body.classList.remove("nav-open");

        }

    });


});