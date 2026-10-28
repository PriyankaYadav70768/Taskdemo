
// LEVEL 1: BASIC FORM


const basicForm = document.getElementById("basicForm");
const basicName = document.getElementById("basicName");
const basicMessage = document.getElementById("basicMessage");

basicForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = basicName.value.trim();

    if (name !== "") {
        basicMessage.textContent =
            "Thank you, " + name + "! Your form was submitted.";

        basicForm.reset();
    }
});



// LEVEL 1: CONTACT FORM


const contactForm = document.getElementById("contactForm");
const contactName = document.getElementById("contactName");
const contactMessage = document.getElementById("contactMessage");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = contactName.value.trim();

    if (name !== "") {
        contactMessage.textContent =
            "Thank you, " + name + "! Form submitted successfully.";

        contactForm.reset();
    }
});



// LEVEL 3: CLICKABLE IMAGE GALLERY


const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);

const lightbox = document.getElementById("lightbox");
const largeImage = document.getElementById("largeImage");
const imageCaption = document.getElementById("imageCaption");

let currentImageIndex = 0;

function showLargeImage(index) {
    currentImageIndex =
        (index + galleryItems.length) % galleryItems.length;

    const item = galleryItems[currentImageIndex];
    const thumbnail = item.querySelector("img");
    const caption = item.querySelector("span");

    largeImage.src = thumbnail.src;
    largeImage.alt = thumbnail.alt;
    imageCaption.textContent = caption.textContent;

    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
}

galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () {
        showLargeImage(index);
    });
});

document.getElementById("closeLightbox")
    .addEventListener("click", closeLightbox);

document.getElementById("previousImage")
    .addEventListener("click", function () {
        showLargeImage(currentImageIndex - 1);
    });

document.getElementById("nextImage")
    .addEventListener("click", function () {
        showLargeImage(currentImageIndex + 1);
    });

lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", function (event) {
    if (lightbox.hidden) return;

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showLargeImage(currentImageIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showLargeImage(currentImageIndex - 1);
    }
});



// LEVEL 3: AUTOMATIC IMAGE SLIDESHOW


const slides = galleryItems.map(function (item) {
    const image = item.querySelector("img");
    const title = item.querySelector("span");

    return {
        src: image.src,
        alt: image.alt,
        title: title.textContent
    };
});

const slideImage = document.getElementById("slideImage");
const slideTitle = document.getElementById("slideTitle");
const slideNumber = document.getElementById("slideNumber");
const slideDots = document.getElementById("slideDots");
const pauseButton = document.getElementById("pauseSlide");

let currentSlideIndex = 0;
let slideshowTimer;
let slideshowPaused = false;

function showSlide(index) {
    currentSlideIndex =
        (index + slides.length) % slides.length;

    const slide = slides[currentSlideIndex];

    slideImage.classList.add("fade-out");

    slideImage.src = slide.src;
    slideImage.alt = slide.alt;
    slideTitle.textContent = slide.title;

    slideNumber.textContent =
        String(currentSlideIndex + 1).padStart(2, "0") +
        " / " +
        String(slides.length).padStart(2, "0");

    document.querySelectorAll(".slide-dot").forEach(
        function (dot, dotIndex) {
            dot.classList.toggle(
                "active",
                dotIndex === currentSlideIndex
            );

            dot.setAttribute(
                "aria-current",
                dotIndex === currentSlideIndex ? "true" : "false"
            );
        }
    );
}

slideImage.addEventListener("load", function () {
    slideImage.classList.remove("fade-out");
});

function startSlideshow() {
    clearInterval(slideshowTimer);

    if (!slideshowPaused) {
        slideshowTimer = setInterval(function () {
            showSlide(currentSlideIndex + 1);
        }, 3000);
    }
}

// Create clickable slideshow dots
slides.forEach(function (slide, index) {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "slide-dot";
    dot.setAttribute("aria-label", "Show slide " + (index + 1));

    dot.addEventListener("click", function () {
        showSlide(index);
        startSlideshow();
    });

    slideDots.appendChild(dot);
});

// Previous slide
document.getElementById("prevSlide")
    .addEventListener("click", function () {
        showSlide(currentSlideIndex - 1);
        startSlideshow();
    });

// Next slide
document.getElementById("nextSlide")
    .addEventListener("click", function () {
        showSlide(currentSlideIndex + 1);
        startSlideshow();
    });

// Pause and play
pauseButton.addEventListener("click", function () {
    slideshowPaused = !slideshowPaused;

    pauseButton.textContent = slideshowPaused
        ? "Play Slideshow"
        : "Pause Slideshow";

    startSlideshow();
});

// Start the slideshow
showSlide(0);
startSlideshow();

console.log("Cognifyz Levels 1, 2 and 3 loaded successfully!");


// ===== TASK 1: COLOR CHANGING BUTTON =====

const colorButton = document.getElementById("colorButton");

const buttonColors = [
    "#2859b8",
    "#d94e7a",
    "#397449",
    "#8055b7",
    "#e58a36"
];

let colorIndex = 0;

colorButton.addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % buttonColors.length;

    colorButton.style.backgroundColor = buttonColors[colorIndex];
});


// ===== TASK 2: TIME-BASED GREETING =====

const greetingButton = document.getElementById("greetingButton");
const greetingMessage = document.getElementById("greetingMessage");

greetingButton.addEventListener("click", function () {
    const currentHour = new Date().getHours();

    let greeting;

    if (currentHour < 12) {
        greeting = "Good Morning! Have a wonderful day.";
    } else if (currentHour < 17) {
        greeting = "Good Afternoon! Keep learning.";
    } else if (currentHour < 21) {
        greeting = "Good Evening! Keep growing.";
    } else {
        greeting = "Good Night! Have a peaceful night.";
    }

    greetingMessage.textContent = greeting;
    alert(greeting);
});


//  TASK 3: ADDITION CALCULATOR 

const number1 = document.getElementById("number1");
const number2 = document.getElementById("number2");
const addButton = document.getElementById("addButton");
const calculatorResult = document.getElementById("calculatorResult");

addButton.addEventListener("click", function () {
    if (
        number1.value.trim() === "" ||
        number2.value.trim() === ""
    ) {
        calculatorResult.textContent =
            "Please enter both numbers.";

        return;
    }

    const firstNumber = Number(number1.value);
    const secondNumber = Number(number2.value);

    const sum = firstNumber + secondNumber;

    calculatorResult.textContent = "Result: " + sum;
});


// LEVEL 2 TASK 2: MOBILE NAVIGATION

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");

    hamburger.setAttribute("aria-expanded", isOpen);

    hamburger.textContent = isOpen ? "✕" : "☰";
});

// Close menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-expanded", "false");
    });
});
