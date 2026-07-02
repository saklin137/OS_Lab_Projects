/*==========================================================
BBIT LAB PORTAL
script.js
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
    AOS
    ==================================================*/

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            once: true,
            offset: 80
        });
    }

    /*==================================================
    NAVBAR SCROLL
    ==================================================*/

    const navbar = document.querySelector(".navbar");

    function navbarScroll() {

        if (window.scrollY > 60) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", navbarScroll);

    navbarScroll();

    /*==================================================
    COUNTER
    ==================================================*/

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = Number(counter.dataset.target);

            let current = 0;

            const speed = target / 80;

            const update = () => {

                current += speed;

                if (current >= target) {

                    counter.innerText = target + "+";

                } else {

                    counter.innerText = Math.floor(current);

                    requestAnimationFrame(update);

                }

            };

            update();

            counterObserver.unobserve(counter);

        });

    });

    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

    /*==================================================
    LAB SEARCH
    ==================================================*/

    const search = document.querySelector(".search-box input");

    const cards = document.querySelectorAll(".lab-card");

    if (search) {

        search.addEventListener("keyup", function () {

            let value = this.value.toLowerCase();

            cards.forEach(card => {

                const title = card.querySelector("h4").innerText.toLowerCase();

                if (title.includes(value)) {

                    card.parentElement.style.display = "block";

                } else {

                    card.parentElement.style.display = "none";

                }

            });

        });

    }

    /*==================================================
    DARK MODE
    ==================================================*/

    const themeBtn = document.querySelector(".theme-btn");

    if (themeBtn) {

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const icon = themeBtn.querySelector("i");

            if (document.body.classList.contains("dark-mode")) {

                icon.className = "bi bi-sun-fill";

            } else {

                icon.className = "bi bi-moon-stars";

            }

        });

    }

    /*==================================================
    ACTIVE NAV
    ==================================================*/

    const sections = document.querySelectorAll("section[id]");

    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;

            const height = section.offsetHeight;

            if (scrollY >= top && scrollY < top + height) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    /*==================================================
    SMOOTH SCROLL
    ==================================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            window.scrollTo({

                top: target.offsetTop - 70,

                behavior: "smooth"

            });

        });

    });

    /*==================================================
    FLOATING CARD EFFECT
    ==================================================*/

    document.querySelectorAll(".floating-card").forEach((card, index) => {

        let offset = index * 8;

        setInterval(() => {

            card.style.transform = `translateY(${Math.sin(Date.now()/600 + offset)*8}px)`;

        }, 20);

    });

    /*==================================================
    CARD HOVER TILT
    ==================================================*/

    document.querySelectorAll(".lab-card").forEach(card => {

        card.addEventListener("mousemove", (e) => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;

            const y = e.clientY - rect.top;

            const rotateX = ((y / rect.height) - 0.5) * -10;

            const rotateY = ((x / rect.width) - 0.5) * 10;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-8px)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });

    /*==================================================
    LOADER
    ==================================================*/

    const loader = document.querySelector(".loader");

    if (loader) {

        window.addEventListener("load", () => {

            loader.classList.add("hide");

        });

    }

    /*==================================================
    CURRENT YEAR
    ==================================================*/

    const year = document.querySelector("#year");

    if (year) {

        year.innerText = new Date().getFullYear();

    }

    console.log("🚀 BBIT Lab Portal Loaded Successfully");

});