let intro = document.querySelector(".intro");
let logo = document.querySelector(".logo-header");
let logoSpan = document.querySelectorAll(".logo");
let spacers = document.querySelectorAll(".spacer");

document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(
        Flip,
        ScrollTrigger,
        ScrollToPlugin,
        TextPlugin,
        RoughEase,
        ExpoScaleEase,
        SlowMo,
        CustomEase
    );
    const lenis = new Lenis();

    function scrollTo(destination) {
        lenis.scrollTo(destination);
    }

    lenis.on("scroll", (e) => {
        console.log(e);
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // SPLASH
    console.log("Initializing splash animation...");
    setTimeout(() => {
        console.log("Starting splash animation...");
        document.body.classList.add("no-scroll");
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add("active");
                console.log(`Span ${idx} active`); // Log active state
            }, (idx + 1) * 350);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove("active");
                    span.classList.add("fade");
                    console.log(`Span ${idx} fading`); // Log fading state
                }, (idx + 1) * 50);
            });
        }, 2000);

        setTimeout(() => {
            intro.style.top = "-150vh";
            console.log("Hiding intro..."); // Log hiding intro
            setTimeout(() => {
                document.body.classList.remove("no-scroll");
                console.log("No-scroll class removed."); // Log scroll enabled
            }, 1000);
        }, 2300);
    }, 0); // Ensure this runs immediately on page load

    spacers.forEach((spacer) => {
        spacer.style.height =
            document.querySelector(".nav").offsetHeight + "px";
        spacer.style.display = "flex";
    });

    // Add click event listeners to the spans
    document.querySelectorAll(".scroll-to").forEach((span) => {
        span.addEventListener("click", () => {
            const targetId = span.getAttribute("data-target");
            scrollTo(targetId); // Use the scrollTo function
        });
    });
});
