import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createStaggeredTimeline, createStaggeredImageTimeline } from "./staggered-list";

gsap.registerPlugin(ScrollTrigger);

const debugMode = false; // Set to false for production

// Global animation settings
const PAGE_TITLE_APPEAR_TIME = 0.0;
const PAGE_TITLE_DURATION = 1.0;

// ===== PAGE 1: TITLE PAGE ANIMATION =====
const PAGE_1_TITLE_APPEAR_TIME = 0.0;
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
  PAGE_1_TITLE_APPEAR_TIME
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
  PAGE_1_BYLINE_APPEAR_TIME
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

// ===== PAGE 3: TRANSITION & CONTENT =====
const page3Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-3",
    start: "top top",
    end: "bottom -=50% top",
    scrub: 1.2,
    markers: true,
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
    markers: true,
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
    markers: true,
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
    markers: false,
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

// ===== PAGE 6: FINAL TRANSITION & CONTENT =====
const page7Timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-7",
    start: "top top",
    end: "bottom top +=100%",
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