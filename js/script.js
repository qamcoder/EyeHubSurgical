/* =========================================
   EYEHUB SURGICAL
   MAIN JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuButton = document.getElementById("menuButton");

const navbar = document.getElementById("navbar");

menuButton.addEventListener("click", function () {

    const isOpen = navbar.classList.toggle("show");

    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");

});


/* Close mobile menu after clicking a link */

const navLinks = document.querySelectorAll(".nav-link, .nav-quote");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navbar.classList.remove("show");
        menuButton.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");

    });

});


/* =========================================
   PRODUCT FILTER
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");

const productCards = document.querySelectorAll(".product-card");
const productLinks = document.querySelectorAll(".product-link");


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        /* Remove active class */

        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        /* Add active class to clicked button */

        button.classList.add("active");


        const filter = button.getAttribute("data-filter");


        productCards.forEach(function (card) {

            const category = card.getAttribute("data-category");


            if (filter === "all" || category === filter) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =========================================
   QUOTE FORM
========================================= */

const quoteForm = document.getElementById("quoteForm");


quoteForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name = document.getElementById("name").value;

    const company = document.getElementById("company").value;

    const email = document.getElementById("email").value;

    const country = document.getElementById("country").value;

    const products = document.getElementById("productInterest").value;

    const message = document.getElementById("message").value;


    const subject =
        "Eyehub Surgical - New B2B Product Inquiry";


    const body =
        "Hello Eyehub Surgical,%0D%0A%0D%0A" +

        "I would like to inquire about your surgical instruments.%0D%0A%0D%0A" +

        "Name: " + encodeURIComponent(name) + "%0D%0A" +

        "Company: " + encodeURIComponent(company) + "%0D%0A" +

        "Email: " + encodeURIComponent(email) + "%0D%0A" +

        "Country: " + encodeURIComponent(country) + "%0D%0A" +

        "Product Interest: " + encodeURIComponent(products) + "%0D%0A%0D%0A" +

        "Requirements:%0D%0A" +

        encodeURIComponent(message) +

        "%0D%0A%0D%0AThank you.";


    window.location.href =
        "mailto:info@eyehubsurgical.com" +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        body;

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");


window.addEventListener("scroll", function () {

    let current = "";


    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.clientHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");


        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(
    ".about-image, .about-content, .section-heading, " +
    ".product-card, .process-card, .benefit-card, .contact-card, " +
    ".quote-wrapper, .footer-grid"
);

revealElements.forEach(function (element) {
    element.classList.add("scroll-reveal");
});

const revealObserver = new IntersectionObserver(
    function (entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -40px"
    }
);

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});

const heroObserver = new IntersectionObserver(
    function (entries, observer) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.2
    }
);

document.querySelectorAll(".hero, .hero-card").forEach(function (element) {
    heroObserver.observe(element);
});

productLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        const productInterest = document.getElementById("productInterest");
        const messageField = document.getElementById("message");
        const productName = link.getAttribute("data-product");

        productInterest.value = productName;
        window.setTimeout(function () {
            messageField.focus();
        }, 350);
    });
});