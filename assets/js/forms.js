/* =========================================================
   SAMS MARINE SERVICES
   CONTACT FORM
   EMAILJS INTEGRATION
   ========================================================= */

"use strict";


/* =========================================================
   EMAILJS CONFIGURATION
   ========================================================= */

const EMAILJS_PUBLIC_KEY =
    "mFy55jI7u-3Ej7blf";

const EMAILJS_SERVICE_ID =
    "service_j2lzra8";

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
        document.getElementById("contactForm");


    if (!form) {
        return;
    }


    /* Check EmailJS */

    if (typeof emailjs === "undefined") {

        console.error(
            "SAMS Marine Services: EmailJS library was not loaded."
        );

        return;

    }


    /* Initialize EmailJS */

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });


    /* Submit event */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            sendContactForm(form);

        }
    );


    /* Live validation */

    initContactValidation(form);


    console.log(
        "SAMS Marine Services: Contact form initialized."
    );

}


/* =========================================================
   SEND CONTACT FORM
   ========================================================= */

function sendContactForm(form) {

    const submitButton =
        document.getElementById("contactSubmit");

    const messageBox =
        document.getElementById("contactFormMessage");


    /* Validate */

    if (!validateContactForm(form)) {

        showFormMessage(
            messageBox,
            "Please complete all required fields correctly.",
            "error"
        );

        return;

    }


    /* Save original button */

    const originalButtonContent =
        submitButton
            ? submitButton.innerHTML
            : "";


    /* Loading state */

    if (submitButton) {

        submitButton.disabled = true;

        submitButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';

    }


    /* Clear previous message */

    if (messageBox) {

        messageBox.textContent = "";

        messageBox.className =
            "form-message";

    }


    /* Read form */

    const formData =
        new FormData(form);


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

        subject:
            subject,

        message:
            message,

        reply_to:
            email,

        to_email:
            SAMS_EMAILS.join(", "),

        company_name:
            "SAMS Marine Services",

        tagline:
            "OFFSHORE | ONSHORE | ONBOARD",

        website:
            "SAMS Marine Services"

    };


    console.log(
        "SAMS Marine Services: Sending contact enquiry..."
    );


    /* =====================================================
       SEND THROUGH EMAILJS
       ===================================================== */

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


            showFormMessage(
                messageBox,
                "Thank you. Your enquiry has been sent successfully. Our team will contact you shortly.",
                "success"
            );


            form.reset();


            const nameField =
                document.getElementById("contactName");


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


            showFormMessage(
                messageBox,
                "Sorry, we could not send your enquiry right now. Please contact SAMS Marine Services directly by email or phone.",
                "error"
            );

        }
    )

    .finally(
        function () {

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
        form.querySelectorAll("[required]");


    requiredFields.forEach(
        function (field) {

            if (!validateField(field)) {
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


    clearFieldError(field);


    /* Required */

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


    /* Email */

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


    /* Phone */

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

                    clearFieldError(field);

                }
            );


            field.addEventListener(
                "blur",
                function () {

                    if (
                        field.hasAttribute("required") ||
                        field.value.trim()
                    ) {

                        validateField(field);

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


    let error =
        field.parentElement.querySelector(
            ".field-error"
        );


    if (!error) {

        error =
            document.createElement("small");

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
        "form-message";


    messageBox.classList.add(
        type
    );


    messageBox.style.display =
        "block";

    messageBox.style.visibility =
        "visible";

    messageBox.style.opacity =
        "1";


    setTimeout(
        function () {

            messageBox.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        },
        100
    );

}