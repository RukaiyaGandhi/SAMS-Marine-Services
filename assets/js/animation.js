/* =========================================================
   SAMS MARINE SERVICES
   SCROLL ANIMATION JAVASCRIPT
   ========================================================= */

"use strict";


document.addEventListener("DOMContentLoaded", function () {

    initRevealAnimations();

});


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

function initRevealAnimations() {

    const elements = document.querySelectorAll(
        ".reveal, " +
        ".fade-up, " +
        ".fade-in, " +
        ".slide-left, " +
        ".slide-right, " +
        ".service-card, " +
        ".product-card, " +
        ".industry-card, " +
        ".feature-card, " +
        ".benefit-card, " +
        ".process-step, " +
        ".industry-benefit"
    );


    if (!elements.length) {
        return;
    }


    /* -----------------------------------------
       FALLBACK
    ----------------------------------------- */

    if (!("IntersectionObserver" in window)) {

        elements.forEach(function (element) {

            element.classList.add("is-visible");

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "is-visible"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    elements.forEach(function (element, index) {

        /*
         * Small stagger effect
         */

        if (
            element.classList.contains(
                "service-card"
            ) ||
            element.classList.contains(
                "product-card"
            ) ||
            element.classList.contains(
                "industry-card"
            )
        ) {

            element.style.setProperty(
                "--animation-delay",
                `${(index % 4) * 80}ms`
            );

        }


        observer.observe(element);

    });

}