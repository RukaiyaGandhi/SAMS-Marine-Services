/* =========================================================
   SAMS MARINE SERVICES
   CONTACT FORM
   EMAILJS INTEGRATION
   ========================================================= */

"use strict";


/* =========================================================
   EMAILJS CONFIGURATION
   =========================================================

   Replace these three values with the values
   from your EmailJS account.

   DO NOT change the variable names.
========================================================= */

const EMAILJS_PUBLIC_KEY =
    "mFy55jI7u-3Ej7blf";

const EMAILJS_SERVICE_ID =
    "service_62z3x1q";

const EMAILJS_TEMPLATE_ID =
    "template_h9oh7ik";

/* =========================================================
   SAMS EMAIL RECIPIENTS
========================================================= */

const SAMS_EMAILS = [
    "supply@samsmarineservices.in",
    "agency@samsmarineservices.in",
    "workshop@samsmarineservices.in"
];


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initContactForm();

    }
);


/* =========================================================
   INITIALIZE CONTACT FORM
========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    /*
     * Contact form does not exist
     * on this page.
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
            EMAILJS_PUBLIC_KEY

    });


    /*
     * Submit event
     */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            sendContactForm(form);

        }
    );


    /*
     * Live field validation
     */

    initContactValidation(form);

}


/* =========================================================
   SEND CONTACT FORM
========================================================= */

function sendContactForm(form) {

    const submitButton =
        document.getElementById(
            "contactSubmit"
        );


    const messageBox =
        document.getElementById(
            "contactFormMessage"
        );


    /*
     * Validate
     */

    if (
        !validateContactForm(form)
    ) {

        showFormMessage(
            messageBox,
            "Please complete all required fields correctly.",
            "error"
        );

        return;

    }


    /*
     * Save original button content
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
     * Create form data
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

    const subject =
        formData.get("subject") || "";

    const message =
        formData.get("message") || "";


    /*
     * EmailJS template parameters
     *
     * These names must match your
     * EmailJS template variables.
     */

    const templateParams = {

        name: name,

        company: company,

        email: email,

        phone: phone,

        subject: subject,

        message: message,


        /*
         * Customer email becomes Reply-To
         */

        reply_to: email,


        /*
         * All SAMS recipients
         *
         * Use this in your EmailJS
         * template if required.
         */

        to_email:
            SAMS_EMAILS.join(", "),


        /*
         * Company identification
         */

        company_name:
            "SAMS Marine Services",

        tagline:
            "OFFSHORE | ONSHORE | ONBOARD",

        website:
            "SAMS Marine Services"

    };


    /*
     * Send through EmailJS
     */

    emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
    )

    .then(
        function (response) {

            console.log(
                "SAMS enquiry sent successfully:",
                response.status,
                response.text
            );


            /*
             * Success message
             */

            showFormMessage(
                messageBox,
                "Thank you. Your enquiry has been sent successfully. Our team will contact you shortly.",
                "success"
            );


            /*
             * Reset form
             */

            form.reset();


            /*
             * Return focus to name field
             */

            const nameField =
                document.getElementById(
                    "contactName"
                );


            if (nameField) {

                nameField.focus();

            }

        }
    )

    .catch(
        function (error) {

            console.error(
                "SAMS enquiry sending failed:",
                error
            );


            /*
             * Error message
             */

            showFormMessage(
                messageBox,
                "Sorry, we could not send your enquiry right now. Please contact SAMS Marine Services directly by email or phone.",
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
   VALIDATE CONTACT FORM
========================================================= */

function validateContactForm(form) {

    let valid = true;


    const requiredFields =
        form.querySelectorAll(
            "[required]"
        );


    requiredFields.forEach(
        function (field) {

            const fieldValid =
                validateField(field);


            if (!fieldValid) {

                valid = false;

            }

        }
    );


    return valid;

}


/* =========================================================
   VALIDATE INDIVIDUAL FIELD
========================================================= */

function validateField(field) {

    const value =
        field.value.trim();


    /*
     * Clear previous error
     */

    clearFieldError(field);


    /*
     * Required field
     */

    if (
        field.hasAttribute("required") &&
        !value
    ) {

        showFieldError(
            field,
            "This field is required."
        );

        return false;

    }


    /*
     * Email
     */

    if (
        field.type === "email" &&
        value &&
        !isValidEmail(value)
    ) {

        showFieldError(
            field,
            "Please enter a valid email address."
        );

        return false;

    }


    /*
     * Phone
     *
     * Phone is optional on this form,
     * so only validate when supplied.
     */

    if (
        field.type === "tel" &&
        value &&
        !isValidPhone(value)
    ) {

        showFieldError(
            field,
            "Please enter a valid phone number."
        );

        return false;

    }


    return true;

}


/* =========================================================
   EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


/* =========================================================
   PHONE VALIDATION
========================================================= */

function isValidPhone(phone) {

    const cleaned =
        phone.replace(
            /[\s().\-+]/g,
            ""
        );


    return /^\d{7,15}$/
        .test(cleaned);

}


/* =========================================================
   LIVE VALIDATION
========================================================= */

function initContactValidation(form) {

    const fields =
        form.querySelectorAll(
            "input, textarea"
        );


    fields.forEach(
        function (field) {

            field.addEventListener(
                "input",
                function () {

                    clearFieldError(
                        field
                    );

                }
            );


            field.addEventListener(
                "blur",
                function () {

                    if (
                        field.hasAttribute(
                            "required"
                        ) ||
                        field.value.trim()
                    ) {

                        validateField(
                            field
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   SHOW FIELD ERROR
========================================================= */

function showFieldError(
    field,
    message
) {

    field.classList.add(
        "input-error"
    );


    /*
     * Look for an existing error
     */

    let error =
        field.parentElement.querySelector(
            ".field-error"
        );


    /*
     * Create error element
     */

    if (!error) {

        error =
            document.createElement(
                "small"
            );


        error.className =
            "field-error";


        field.parentElement.appendChild(
            error
        );

    }


    error.textContent =
        message;

}


/* =========================================================
   CLEAR FIELD ERROR
========================================================= */

function clearFieldError(field) {

    field.classList.remove(
        "input-error"
    );


    const error =
        field.parentElement.querySelector(
            ".field-error"
        );


    if (error) {

        error.remove();

    }

}


/* =========================================================
   FORM MESSAGE
========================================================= */

function showFormMessage(
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
     * Keep message visible
     * without jumping the entire page.
     */

    messageBox.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}