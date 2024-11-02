// Elements selection
const intro = document.querySelector(".intro");
const logoSpan = document.querySelectorAll(".logo");
const spacers = document.querySelectorAll(".spacer");
const navHeight = document.querySelector(".nav").offsetHeight;

// Initialize GSAP plugins and Lenis scroll
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, TextPlugin, CustomEase);
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Scroll function for anchor links
    document.querySelectorAll(".scroll-to").forEach(span => {
        span.addEventListener("click", () => {
            const targetId = span.getAttribute("data-target");
            lenis.scrollTo(targetId);
        });
    });

    // Adjust spacer heights for nav spacing
    spacers.forEach(spacer => {
        spacer.style.cssText = `height: ${navHeight}px; display: flex;`;
    });

    // Splash animation
    const splashAnimation = () => {
        document.body.classList.add("no-scroll");

        logoSpan.forEach((span, idx) => {
            setTimeout(() => span.classList.add("active"), (idx + 1) * 350);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove("active");
                    span.classList.add("fade");
                }, (idx + 1) * 50);
            });
        }, 2000);

        setTimeout(() => {
            intro.style.top = "-150vh";
            setTimeout(() => document.body.classList.remove("no-scroll"), 1000);
        }, 2300);
    };

    // Run splash animation immediately on load
    splashAnimation();
});