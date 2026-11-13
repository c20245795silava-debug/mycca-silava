import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const themeButton = document.querySelector("#switch");

if (themeButton) {
    const updateThemeButton = () => {
        const isDark = root.classList.contains("dark");
        themeButton.textContent = isDark ? "Light Mode" : "Dark Mode";
        themeButton.setAttribute("aria-pressed", String(isDark));
    };

    updateThemeButton();
    themeButton.addEventListener("click", () => {
        root.classList.toggle("dark");
        updateThemeButton();
        gsap.fromTo(
            themeButton,
            { scale: 0.85 },
            { scale: 1, duration: 0.35, ease: "elastic.out(1, 0.4)" },
        );
    });
}

const intro = gsap.timeline({
    defaults: { duration: 0.6, ease: "power2.out" },
});

const heroLinks = gsap.utils.toArray("#hero a");
if (heroLinks.length) {
    intro.from(heroLinks, { y: 30, opacity: 0, stagger: 0.15 });
}

const heroCard = document.querySelector("#hero .glass-card");
if (heroCard) {
    intro.from(
        heroCard,
        { y: 60, opacity: 0, scale: 0.92, duration: 0.8, ease: "back.out(1.4)" },
    );
}

const footer = document.querySelector("footer");
if (footer) {
    intro.from(footer, { y: 30, opacity: 0 });
}

const replayButton = document.querySelector("#replay");
replayButton?.addEventListener("click", () => {
    gsap.to(replayButton, {
        rotation: "+=360",
        duration: 0.6,
        ease: "power2.inOut",
    });
    intro.restart();
});

gsap.from("nav ul li", {
    y: -30,
    opacity: 0,
    duration: 0.6,
    ease: "back.out(1.7)",
    stagger: 0.12,
});

const revealCards = gsap.utils.toArray(".glass-card").filter(
    (card) => !card.closest("#hero"),
);
revealCards.forEach((card) => {
    gsap.fromTo(
        card,
        { autoAlpha: 0, y: 50 },
        {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        },
    );
});

gsap.utils.toArray("#about, #projects, #services").forEach((section) => {
    gsap.fromTo(
        section,
        { opacity: 1 },
        {
            opacity: 0.2,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            },
        },
    );
});

const heroGrid = document.querySelector("#hero .grid");
if (heroGrid) {
    const heroExit = gsap.to(heroGrid, {
        y: -80,
        opacity: 0,
        ease: "none",
        paused: true,
    });

    ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "+=350",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        animation: heroExit,
        invalidateOnRefresh: true,
    });
}

const progressBar = document.querySelector("#progressBar");
if (progressBar) {
    gsap.fromTo(
        progressBar,
        { scaleX: 0 },
        {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.2,
            },
        },
    );
}

const contactForm = document.querySelector("#contactForm");
const contactStatus = document.querySelector("#contactStatus");
contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (contactStatus) {
        contactStatus.textContent =
            "This demo form is not connected to a mail service yet.";
    }
});

window.addEventListener("load", () => ScrollTrigger.refresh());
