
const heroSlider = document.getElementById("heroSlider");

if (heroSlider) {
    const slides = heroSlider.querySelectorAll(".hero-slide");
    const dots = heroSlider.querySelectorAll(".slider-dot");
    const prevButton = heroSlider.querySelector(".prev-slide");
    const nextButton = heroSlider.querySelector(".next-slide");

    let currentSlide = 0;
    let slideInterval;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            const isActive = i === currentSlide;

            slide.classList.toggle("active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));

            // Prevent keyboard focus on links in hidden slides
            slide.querySelectorAll("a, button").forEach(element => {
                if (isActive) {
                    element.removeAttribute("tabindex");
                } else {
                    element.setAttribute("tabindex", "-1");
                }
            });
        });

        dots.forEach((dot, i) => {
            const isActive = i === currentSlide;

            dot.classList.toggle("active", isActive);
            dot.setAttribute("aria-pressed", String(isActive));
        });
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    function startAutoSlide() {
        stopAutoSlide();

        if (!reduceMotion.matches && !document.hidden) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }

    nextButton.addEventListener("click", () => {
        nextSlide();
        startAutoSlide();
    });

    prevButton.addEventListener("click", () => {
        prevSlide();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startAutoSlide();
        });
    });

    heroSlider.addEventListener("mouseenter", stopAutoSlide);
    heroSlider.addEventListener("mouseleave", startAutoSlide);
    heroSlider.addEventListener("focusin", stopAutoSlide);
    heroSlider.addEventListener("focusout", event => {
        if (!heroSlider.contains(event.relatedTarget)) {
            startAutoSlide();
        }
    });

    document.addEventListener("visibilitychange", startAutoSlide);

    reduceMotion.addEventListener("change", startAutoSlide);

    showSlide(0);
    startAutoSlide();
}
