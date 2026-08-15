/* =========================================================
   SAMS MARINE SERVICES
   COUNTER JAVASCRIPT
   ========================================================= */

"use strict";


document.addEventListener("DOMContentLoaded", function () {

    initCounters();

});


/* =========================================================
   INITIALIZE COUNTERS
   ========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (!counters.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        counters.forEach(function (counter) {

            setFinalCounterValue(
                counter
            );

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    animateCounter(
                        entry.target
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(function (counter) {

        observer.observe(counter);

    });

}


/* =========================================================
   ANIMATE COUNTER
   ========================================================= */

function animateCounter(counter) {

    const target =
        parseFloat(
            counter.dataset.counter
        );


    if (isNaN(target)) {
        return;
    }


    const duration =
        parseInt(
            counter.dataset.duration,
            10
        ) || 1800;


    const suffix =
        counter.dataset.suffix || "";


    const prefix =
        counter.dataset.prefix || "";


    const decimals =
        parseInt(
            counter.dataset.decimals,
            10
        ) || 0;


    const startTime =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const value =
            target * easedProgress;


        counter.textContent =
            prefix +
            value.toFixed(decimals) +
            suffix;


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            counter.textContent =
                prefix +
                target.toFixed(decimals) +
                suffix;

        }

    }


    requestAnimationFrame(update);

}


/* =========================================================
   FINAL VALUE
   ========================================================= */

function setFinalCounterValue(counter) {

    const target =
        parseFloat(
            counter.dataset.counter
        );


    if (isNaN(target)) {
        return;
    }


    const suffix =
        counter.dataset.suffix || "";


    const prefix =
        counter.dataset.prefix || "";


    const decimals =
        parseInt(
            counter.dataset.decimals,
            10
        ) || 0;


    counter.textContent =
        prefix +
        target.toFixed(decimals) +
        suffix;

}