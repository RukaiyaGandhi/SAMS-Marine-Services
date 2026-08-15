/* =========================================================
   SAMS MARINE SERVICES
   SCROLL JAVASCRIPT
   ========================================================= */

"use strict";


document.addEventListener("DOMContentLoaded", function () {

    initScrollProgress();
    initBackToTop();
    initStickyHeader();

});


/* =========================================================
   SCROLL PROGRESS
   ========================================================= */

function initScrollProgress() {

    const progress =
        document.getElementById(
            "scrollProgress"
        );

    if (!progress) {
        return;
    }


    function updateProgress() {

        const scrollTop =
            window.pageYOffset ||
            document.documentElement.scrollTop;


        const documentHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;


        if (documentHeight <= 0) {

            progress.style.width = "0%";

            return;

        }


        const percentage =
            (scrollTop /
                documentHeight) *
            100;


        progress.style.width =
            Math.min(
                percentage,
                100
            ) + "%";

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        {
            passive: true
        }
    );


    updateProgress();

}


/* =========================================================
   BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backToTop"
        );

    if (!button) {
        return;
    }


    function updateButton() {

        if (
            window.pageYOffset > 400
        ) {

            button.classList.add(
                "show"
            );

        } else {

            button.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateButton,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateButton();

}


/* =========================================================
   STICKY HEADER
   ========================================================= */

function initStickyHeader() {

    const header =
        document.querySelector(
            ".site-header"
        );

    if (!header) {
        return;
    }


    function updateHeader() {

        if (
            window.pageYOffset > 40
        ) {

            header.classList.add(
                "header-scrolled"
            );

        } else {

            header.classList.remove(
                "header-scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();

}