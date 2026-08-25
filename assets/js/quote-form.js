/* =========================================================
   SAMS MARINE SERVICES
   REQUEST QUOTE FORM
   EMAILJS INTEGRATION
   ========================================================= */

"use strict";


/* =========================================================
   EMAILJS CONFIGURATION
   ========================================================= */

const EMAILJS_PUBLIC_KEY =
    "mFy55jI7u-3Ej7blf";

const EMAILJS_SERVICE_ID =
    "service_62z3x1q";

const EMAILJS_QUOTE_TEMPLATE_ID =
    "template_5ihi0gw";


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initQuoteForm();

    }
);


/* =========================================================
   INITIALIZE REQUEST QUOTE FORM
   ========================================================= */

function initQuoteForm() {

    const form =
        document.getElementById(
            "quoteForm"
        );


    /*
     * Request Quote form does not exist
     * on this page.
     */

    if (!form) {
        return;
    }


    /*
     * Check EmailJS
     */

    if (
        typeof emailjs === "undefined"
    ) {

        console.error(
            "SAMS Marine Services: EmailJS library was not loaded."
        );

        return;

    }


    /*
     * Initialize EmailJS
     */

    emailjs.init({

        publicKey:
            EMAILJS_PUBLIC_KEY

    });


    /*
     * Submit event
     */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            sendQuoteForm(form);

        }
    );

}


/* =========================================================
   SEND REQUEST QUOTE
   ========================================================= */

function sendQuoteForm(form) {

    const submitButton =
        document.getElementById(
            "quoteSubmit"
        );


    const messageBox =
        document.getElementById(
            "quoteFormMessage"
        );


    /*
     * Save original button
     */

    const originalButtonContent =
        submitButton
            ? submitButton.innerHTML
            : "";


    /*
     * Loading state
     */

    if (submitButton) {

        submitButton.disabled = true;

        submitButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';

    }


    /*
     * Clear previous message
     */

    if (messageBox) {

        messageBox.textContent = "";

        messageBox.className =
            "form-message";

    }


    /*
     * Get form data
     */

    const formData =
        new FormData(form);


    /*
     * Get customer details
     */

    const name =
        formData.get("name") || "";

    const company =
        formData.get("company") || "";

    const email =
        formData.get("email") || "";

    const phone =
        formData.get("phone") || "";

    const serviceRequired =
        formData.get("service_required") || "";

    const productRequired =
        formData.get("product_required") || "";

    const message =
        formData.get("message") || "";


    /*
     * EmailJS template parameters
     *
     * These names must match the
     * Request Quote EmailJS template.
     */

    const templateParams = {

        name: name,

        company: company,

        email: email,

        phone: phone,

        service_required:
            serviceRequired,

        product_required:
            productRequired,

        message: message,

        reply_to:
            email,

        company_name:
            "SAMS Marine Services",

        tagline:
            "OFFSHORE | ONSHORE | ONBOARD"

    };


    /*
     * Send through EmailJS
     */

    emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_QUOTE_TEMPLATE_ID,
        templateParams
    )

    .then(
        function (response) {

            console.log(
                "SAMS quote request sent successfully:",
                response.status,
                response.text
            );


            /*
             * Success message
             */

            showQuoteMessage(
                messageBox,
                "Thank you. Your quote request has been sent successfully. Our team will contact you shortly.",
                "success"
            );


            /*
             * Reset form
             */

            form.reset();

        }
    )

    .catch(
        function (error) {

            console.error(
                "SAMS quote request sending failed:",
                error
            );


            /*
             * Error message
             */

            showQuoteMessage(
                messageBox,
                "Sorry, we could not send your quote request right now. Please contact SAMS Marine Services directly by email or phone.",
                "error"
            );

        }
    )

    .finally(
        function () {

            /*
             * Restore button
             */

            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.innerHTML =
                    originalButtonContent;

            }

        }
    );

}


/* =========================================================
   SHOW QUOTE FORM MESSAGE
   ========================================================= */

function showQuoteMessage(
    messageBox,
    message,
    type
) {

    if (!messageBox) {
        return;
    }


    messageBox.textContent =
        message;


    messageBox.className =
        "form-message " + type;


    messageBox.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}