import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { createStaggeredTimeline, createStaggeredImageTimeline } from "./staggered-list";

gsap.registerPlugin(ScrollTrigger);

// Detect touch device
const isTouchDevice = () => {
  return (
    navigator.maxTouchPoints > 0 ||
    (window.matchMedia && window.matchMedia("(pointer: coarse)").matches)
  );
};

const isTouch = isTouchDevice();

// Initialize Lenis for smooth scrolling with mobile optimization
const lenis = new Lenis({
  duration: isTouch ? 1.5 : 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: isTouch ? 2 : 1, // Increase responsiveness on touch
});

function raf(time: number) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Update ScrollTrigger on lenis scroll
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable scroll during animations on touch devices
document.addEventListener("touchmove", (e) => {
  const target = e.target as HTMLElement;
  // Allow scrolling on interactive elements like buttons
  if (
    !target.closest(".quiz-btn") &&
    !target.closest(".cta-btn") &&
    !target.closest("button")
  ) {
    // Smooth scroll will still be handled by Lenis
  }
});

// Automatically detect dev vs production
const debugMode = import.meta.env.DEV; // true in dev, false in production/GH Pages

// Global animation settings
const PAGE_TITLE_APPEAR_TIME = 0.0;
const PAGE_TITLE_DURATION = 1.0;

// ===== PAGE 1: TITLE PAGE ANIMATION =====
const PAGE_1_TITLE_APPEAR_TIME = 0.5;
const PAGE_1_TITLE_ANIMATION_DURATION = 2.0;
const PAGE_1_BYLINE_APPEAR_TIME = 0.5;
const PAGE_1_BYLINE_ANIMATION_DURATION = 2.0;

const page1Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-1",
    start: "top top",
    end: "bottom top",
    scrub: 0.2,
    pin: true,
    markers: debugMode, // Set to true for debugging
  },
});

// Animate scroll prompt in first
page1Timeline.fromTo(
  ".scroll-prompt",
  {
    opacity: 1,
    y: 0,
    duration: 1.0,
  },
  {
    opacity: 0,
    y: 50,
  },
  0.0
)

// Animate title in with dramatic scale and opacity
page1Timeline.fromTo(
  ".title",
  {
    opacity: 0,
    y: 50,
    scale: 0.2,
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: PAGE_1_TITLE_ANIMATION_DURATION
  },
  PAGE_1_TITLE_APPEAR_TIME + 0.8
)

// Animate byline in with slight delay
page1Timeline.fromTo(
  ".byline",
  {
    opacity: 0,
    y: 30,
    duration: 2.5,
  },
  {
    opacity: 1,
    y: 0,
    duration: PAGE_1_BYLINE_ANIMATION_DURATION
  },
  PAGE_1_BYLINE_APPEAR_TIME + 0.8
)


// ===== PAGE 2: FADE IN CONTENT =====
const PAGE_2_LIST_START_TIME = 1.0;
const PAGE_2_LIST_ITEM_DELAY = 1.5;
const PAGE_2_LIST_DURATION = 4.0;

const page2Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-2",
    start: "top top",
    end: "bottom -=50% top",
    scrub: 1.2,
    markers: debugMode,
    pin: true,
  },
});

page2Timeline.fromTo(
  ".page-2 .section-title",
  {
    opacity: 0,
    x: "-50px",
    duration: 1,
  },
  {
    opacity: 1,
    x: 0,
    duration: PAGE_TITLE_DURATION
  },
  PAGE_TITLE_APPEAR_TIME
)

// Animate list items in with staggered effect using reusable function
createStaggeredTimeline(
  page2Timeline,
  ".page-2",
  ".staggered-item",
  PAGE_2_LIST_DURATION,
  PAGE_2_LIST_ITEM_DELAY,
  PAGE_2_LIST_START_TIME
);

// ===== PAGE 2 Images: Additional Images Section 1 =====
const PAGE_2_IMAGES_DURATION = 1.0;
const PAGE_2_IMAGES_ITEM_DELAY = 0.5;

const page2Images1Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-2-images-1",
    start: "top +=75% top",
    end: "bottom +=75% top",
    scrub: 1.2,
    markers: debugMode,
    pin: false, // No pinning for image section
  },
});

// Animate images with staggered effect using reusable function
createStaggeredImageTimeline(
  page2Images1Timeline,
  ".page-2-images-1",
  ".staggered-image",
  PAGE_2_IMAGES_DURATION,
  PAGE_2_IMAGES_ITEM_DELAY,
  0
);

// ===== PAGE 2 Images: Additional Images Section 2 =====
const page2Images2Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-2-images-2",
    start: "top +=75% top",
    end: "bottom +=75% top",
    scrub: 1.2,
    markers: debugMode,
    pin: false, // No pinning for image section
  },
});

// Animate images with staggered effect using reusable function
createStaggeredImageTimeline(
  page2Images2Timeline,
  ".page-2-images-2",
  ".staggered-image",
  PAGE_2_IMAGES_DURATION,
  PAGE_2_IMAGES_ITEM_DELAY,
  0
);

// ===== QUIZ 1: ANIMATION =====
const quiz1Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".quiz-1",
    start: "top top",
    end: "bottom top",
    scrub: 1.0,
    markers: debugMode,
    pin: true,
  },
});

quiz1Timeline.fromTo(
  ".quiz-1 .quiz-container",
  {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.0,
  },
  0
).to(
  ".quiz-1 .quiz-container",
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 3.0,
  },
  1.0
);

quiz1Timeline.fromTo(
  ".quiz-1 .quiz-title",
  {
    opacity: 0,
    x: "-30px",
  },
  {
    opacity: 1,
    x: 0,
    duration: 1.0,
  },
  0.25
).to(
  ".quiz-1 .quiz-title",
  {
    opacity: 1,
    x: 0,
    duration: 3.0,
  },
  1.25
);

// ===== PAGE 3: TRANSITION & CONTENT =====
const page3Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-3",
    start: "top top",
    end: "bottom -=50% top",
    scrub: 1.2,
    markers: debugMode,
    pin: true,
  },
});

page3Timeline.fromTo(
  ".page-3 .section-title",
  {
    opacity: 0,
    x: "-50px",
    duration: 1,
  },
  {
    opacity: 1,
    x: 0,
    duration: PAGE_TITLE_DURATION
  },
  PAGE_TITLE_APPEAR_TIME
)

page3Timeline.fromTo(
  ".page-3 .section-text",
  {
    opacity: 0,
    y: 30,
    duration: 1,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1.5
  },
  PAGE_TITLE_APPEAR_TIME + 0.5
);

// ===== PAGE 3 Images =====
const page3Images1Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-3-images-1",
    start: "top +=75% top",
    end: "bottom +=75% top",
    scrub: 1.2,
    markers: debugMode,
    pin: false, // No pinning for image section
  },
});

createStaggeredImageTimeline(
  page3Images1Timeline,
  ".page-3-images-1",
  ".staggered-image",
  PAGE_2_IMAGES_DURATION,
  PAGE_2_IMAGES_ITEM_DELAY,
  0.0
)

// ===== PAGE 4: TRANSITION & CONTENT =====
const page4Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-4",
    start: "top top",
    end: "bottom -=50% top",
    scrub: 1.2,
    markers: debugMode,
    pin: true,
  },
});

page4Timeline.fromTo(
  ".page-4 .section-title",
  {
    opacity: 0,
    x: "-50px",
    duration: 1,
  },
  {
    opacity: 1,
    x: 0,
    duration: PAGE_TITLE_DURATION
  },
  PAGE_TITLE_APPEAR_TIME
)

page4Timeline.fromTo(
  ".page-4 .section-text",
  {
    opacity: 0,
    y: 30,
    duration: 1,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1.5
  },
  PAGE_TITLE_APPEAR_TIME + 0.5
);

// ===== PAGE 4 Images =====
const page4Images1Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-4-images-1",
    start: "top +=75% top",
    end: "bottom +=75% top",
    scrub: 1.2,
    markers: debugMode,
    pin: false, // No pinning for image section
  },
});

createStaggeredImageTimeline(
  page4Images1Timeline,
  ".page-4-images-1",
  ".staggered-image",
  PAGE_2_IMAGES_DURATION,
  PAGE_2_IMAGES_ITEM_DELAY,
  0.0
)

// ===== PAGE 5: TRANSITION & CONTENT =====
const page5Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-5",
    start: "top top",
    end: "bottom -=50% top",
    scrub: 1.2,
    markers: debugMode,
    pin: true,
  },
});

page5Timeline.fromTo(
  ".page-5 .section-title",
  {
    opacity: 0,
    x: "-50px",
    duration: 1,
  },
  {
    opacity: 1,
    x: 0,
    duration: PAGE_TITLE_DURATION
  },
  PAGE_TITLE_APPEAR_TIME
)

page5Timeline.fromTo(
  ".page-5 .section-text",
  {
    opacity: 0,
    y: 30,
    duration: 1,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1.5
  },
  PAGE_TITLE_APPEAR_TIME + 0.5
);

// ===== PAGE 6: FINAL TRANSITION & CONTENT =====
const page6Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-6",
    start: "top top",
    end: "bottom -=50% top",
    scrub: 1.2,
    markers: debugMode,
    pin: true,
  },
});

page6Timeline.fromTo(
  ".page-6 .section-title",
  {
    opacity: 0,
    x: "-50px",
    duration: 1,
  },
  {
    opacity: 1,
    x: 0,
    duration: PAGE_TITLE_DURATION
  },
  PAGE_TITLE_APPEAR_TIME
)

page6Timeline.fromTo(
  ".page-6 .section-text",
  {
    opacity: 0,
    y: 30,
    duration: 1,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1.5
  },
  PAGE_TITLE_APPEAR_TIME + 0.5
);


// ===== QUIZ 2: ANIMATION =====
const quiz2Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".quiz-2",
    start: "top top",
    end: "bottom top",
    scrub: 1.0,
    markers: debugMode,
    pin: true,
  },
});

quiz2Timeline.fromTo(
  ".quiz-2 .quiz-container",
  {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.0,
  },
  0
).to(
  ".quiz-2 .quiz-container",
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 3.0,
  },
  1.0
);

quiz2Timeline.fromTo(
  ".quiz-2 .quiz-title",
  {
    opacity: 0,
    x: "-30px",
  },
  {
    opacity: 1,
    x: 0,
    duration: 1.0,
  },
  0.25
).to(
  ".quiz-2 .quiz-title",
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 3.0,
  },
  1.25
);


// ===== PAGE 7: FINAL TRANSITION & CONTENT =====
const page7Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-7",
    start: "top top",
    end: "bottom -=50% top",
    scrub: 1.2,
    markers: false,
    pin: true,
  },
});

page7Timeline.fromTo(
  ".page-7 .section-title",
  {
    opacity: 0,
    x: "-50px",
    duration: 1,
  },
  {
    opacity: 1,
    x: 0,
    duration: PAGE_TITLE_DURATION
  },
  PAGE_TITLE_APPEAR_TIME
)

page7Timeline.fromTo(
  ".page-7 .section-text",
  {
    opacity: 0,
    y: 30,
    duration: 1,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1.5
  },
  PAGE_TITLE_APPEAR_TIME + 0.5
);

// ===== CALL-TO-ACTION: ANIMATION =====
const ctaTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".cta-section",
    start: "top +=75% top",
    end: "bottom top",
    scrub: 1.2,
    markers: debugMode,
    pin: false,
  },
});

ctaTimeline.fromTo(
  ".cta-section .section-title",
  {
    opacity: 0,
    x: "-50px",
  },
  {
    opacity: 1,
    x: 0,
    duration: 1.0,
  },
  0
).to(
  ".cta-section .section-title",
  {
    opacity: 1,
    x: 0,
    duration: 3.0,
  },
  1.0
);

// Animate each CTA card with stagger
const ctaCards = document.querySelectorAll('.cta-card');
ctaCards.forEach((card, index) => {
  ctaTimeline.fromTo(
    card,
    {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
    },
    0.3 + index * 0.15
  );
});

// ===== QUIZ FUNCTIONALITY =====
document.querySelectorAll('.quiz-btn').forEach((button) => {
  button.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    const isCorrect = target.getAttribute('data-answer') === 'true';
    const quizContainer = target.closest('.quiz-question') as HTMLElement;
    const feedback = quizContainer?.querySelector('.quiz-feedback') as HTMLElement;

    // Remove previously selected styling from all buttons in this quiz
    const allButtons = quizContainer?.querySelectorAll('.quiz-btn') as NodeListOf<HTMLElement>;
    allButtons?.forEach((btn: HTMLElement) => {
      btn.classList.remove('correct', 'incorrect');
      btn.setAttribute('disabled', 'true');
    });

    // Style the clicked button
    if (isCorrect) {
      target.classList.add('correct');
      if (feedback) {
        feedback.classList.remove('incorrect');
        feedback.classList.add('correct');
        feedback.textContent = '✓ Correct! Great understanding of the topic.';
        feedback.style.display = 'block';
      }
    } else {
      target.classList.add('incorrect');
      if (feedback) {
        feedback.classList.remove('correct');
        feedback.classList.add('incorrect');
        feedback.textContent = '✗ Not quite. Think about the core issue discussed in this section.';
        feedback.style.display = 'block';
      }
    }
  });
});

// ===== CALL-TO-ACTION SHARE FUNCTIONALITY =====
const shareBtn = document.getElementById('share-btn');
if (shareBtn) {
  shareBtn.addEventListener('click', () => {
    const shareText = 'Check out this interactive scrollyteller about Hostile Architecture: How exclusionary design affects our communities.';
    const shareUrl = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: 'Hostile Architecture Scrollyteller',
        text: shareText,
        url: shareUrl,
      }).catch((err) => console.log('Share failed:', err));
    } else {
      // Fallback: Copy to clipboard
      const text = `${shareText}\n${shareUrl}`;
      navigator.clipboard.writeText(text).then(() => {
        alert('Link copied to clipboard! Share it with your friends and community.');
      });
    }
  });
}