/* =========================================================
   SAMS MARINE SERVICES
   REQUEST QUOTE FORM
   EMAILJS INTEGRATION
   ========================================================= */

"use strict";


/* =========================================================
   EMAILJS CONFIGURATION
========================================================= */

const EMAILJS_QUOTE_PUBLIC_KEY =
    "mFy55jI7u-3Ej7blf";

const EMAILJS_QUOTE_SERVICE_ID =
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
            "requestQuoteForm"
        );


    /*
     * Form does not exist on this page
     */

    if (!form) {
        return;
    }


    /*
     * Check EmailJS library
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
            EMAILJS_QUOTE_PUBLIC_KEY

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


    /*
     * Prevent normal browser submission
     */

    console.log(
        "SAMS Marine Services: Request Quote form initialized."
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
     * Validate HTML required fields
     */

    if (
        !form.checkValidity()
    ) {

        form.reportValidity();

        return;

    }


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
     * Read form data
     */

    const formData =
        new FormData(form);


    /*
     * Customer details
     */

    const name =
        formData.get("name") || "";

    const company =
        formData.get("company") || "";

    const email =
        formData.get("email") || "";

    const phone =
        formData.get("phone") || "";


    /*
     * Vessel details
     */

    const vessel =
        formData.get("vessel") || "";

    const vesselType =
        formData.get("vessel_type") || "";

    const port =
        formData.get("port") || "";


    /*
     * Service details
     */

    const service =
        formData.get("service") || "";


    /*
     * Compressor details
     */

    const compressorBrand =
        formData.get("compressor_brand") || "";

    const compressorModel =
        formData.get("compressor_model") || "";


    /*
     * Product details
     */

    const product =
        formData.get("product") || "";

    const quantity =
        formData.get("quantity") || "";

    const requiredDate =
        formData.get("required_date") || "";


    /*
     * Requirement message
     */

    const message =
        formData.get("message") || "";


    /* =====================================================
       EMAILJS TEMPLATE PARAMETERS
    ===================================================== */

    const templateParams = {

        name:
            name,

        company:
            company,

        email:
            email,

        phone:
            phone,


        vessel:
            vessel,

        vessel_type:
            vesselType,

        port:
            port,


        service:
            service,


        compressor_brand:
            compressorBrand,

        compressor_model:
            compressorModel,


        product:
            product,

        quantity:
            quantity,

        required_date:
            requiredDate,


        message:
            message,


        /*
         * Customer email becomes Reply-To
         */

        reply_to:
            email,


        /*
         * Company information
         */

        company_name:
            "SAMS Marine Services",

        tagline:
            "OFFSHORE | ONSHORE | ONBOARD"

    };


    console.log(
        "SAMS Marine Services: Sending quote request..."
    );


    /* =====================================================
       SEND THROUGH EMAILJS
    ===================================================== */

    emailjs.send(
        EMAILJS_QUOTE_SERVICE_ID,
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


    /*
     * Scroll message into view
     */

    messageBox.scrollIntoView({

        behavior: "smooth",

        block: "nearest"

    });

}