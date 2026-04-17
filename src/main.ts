import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { createStaggeredTimeline } from "./staggered-list";
import { affordabilityChart } from "./chart-controller";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
  smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
  smoothTouch: 0.1 // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});

// Automatically detect dev vs production
const debugMode = import.meta.env.DEV; // true in dev, false in production/GH Pages

// Global animation settings
const INTRO_APPEAR_TIME = 0.0;
const INTRO_DURATION = 1.0;

const LIST_ITEM_DELAY = 1.5;
const LIST_DURATION = 4.0;
const IMAGES_DURATION = 1.0;
const IMAGES_DELAY = 0.5;

// ===== PAGE 1: TITLE PAGE ANIMATION =====
const INTRO_TITLE_TIME = 1.0;
const INTRO_TITLE_DURATION = 2.0;
const INTRO_BYLINE_TIME = 0.5;
const INTRO_BYLINE_DURATION = 2.0;

const intro_timeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".intro-page",
    start: "top top",
    end: "bottom top",
    scrub: 0.75,
    pin: true,
    markers: debugMode, // Set to true for debugging
  },
});

// Animate scroll hint in first
intro_timeline.fromTo(
  ".scroll-hint",
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
).to(
  ".scroll-hint",
  {
    opacity: 0,
    y: 50,
    duration: INTRO_TITLE_TIME,
  },
  1.0
);

// Animate title in with dramatic scale and opacity
intro_timeline.fromTo(
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
    duration: INTRO_TITLE_DURATION
  },
  INTRO_TITLE_TIME + 0.8
)

// Animate byline in with slight delay
intro_timeline.fromTo(
  ".byline",
  {
    opacity: 0,
    y: 30,
    duration: 2.5,
  },
  {
    opacity: 1,
    y: 0,
    duration: INTRO_BYLINE_DURATION
  },
  INTRO_BYLINE_TIME + 0.8
)


// ===== AUTO-GENERATE TIMELINES FOR ALL SECTIONS =====
document.querySelectorAll('section').forEach((section) => {
  // Skip the intro page (special case with custom animation)
  if (section.classList.contains('intro-page')) {
    return;
  }
  console.log(`Creating timeline for section:`, section);

  createSectionTimeline(section as HTMLElement);
});

// ===== CALL-TO-ACTION: ANIMATION =====
const CALL_TO_ACTION_DURATION = 2.0;

const ctaTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".cta-section",
    start: "top +=50% top",
    end: "center center",
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
  { duration: 1.0 - CALL_TO_ACTION_DURATION },
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
ctaTimeline.addPause(1.5); // Pause after cards animate in for emphasis

window.addEventListener('load', () => {
  try {
    // Initialize the chart immediately
    affordabilityChart.initialize({
      containerId: 'stats-chart-container',
      yearStart: 2001,
      yearEnd: 2025,
    });

    console.log('Chart animation timeline created successfully');
  } catch (error) {
    console.error('Error initializing statistics chart:', error);
  }
});

// ===== Section Animations =====
type SectionContentType = 'section-title' | 'section-text' | 'section-list' | 'chart-container' | 'chart-legend';
function createSectionTimeline(section: HTMLElement): gsap.core.Timeline {
  let is_pinned = section.classList.contains("pinned-section");
  console.log(`Creating timeline for ${section.className} with pinning: ${is_pinned}`);

  let appear = section.getAttribute("appear") || "";
  let length = section.getAttribute("length") || "";
  console.log(`Section ${section.className} - appear: ${appear}, length: ${length}`);

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: `top ${appear} top`,
      end: is_pinned && length ? `bottom ${length}` : (is_pinned ? "bottom top" : "bottom bottom"),
      scrub: 1.2,
      markers: debugMode,
      pin: is_pinned,
    },
  });

  if (section.classList.contains('quiz-section')) {
    animate_quiz_section(timeline, section as HTMLElement);
  }

  section.querySelectorAll('.section-content > *').forEach((child) => {
    console.log(`Animating child element:`, child);
    let type: SectionContentType | null = child.classList.contains('section-title')
      ? 'section-title'
      : child.classList.contains('section-text')
        ? 'section-text'
        : child.classList.contains('section-list')
          ? 'section-list'
          : child.classList.contains('chart-container')
            ? 'chart-container'
            : child.classList.contains('chart-legend')
              ? 'chart-legend'
              : null;


    if (type === 'section-title') {
      animate_section_title(child as HTMLElement, timeline);
    } else if (type === 'section-text') {
      animate_section_text(child as HTMLElement, timeline);
    } else if (type === 'section-list') {
      createStaggeredTimeline(
        timeline,
        child as HTMLElement,
        LIST_DURATION,
        LIST_ITEM_DELAY,
        INTRO_APPEAR_TIME + 0.5
      );
    } else if (type === 'chart-container') {
      timeline.fromTo(
        child as HTMLElement,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.0 },
        0.4
      ).to(
        child as HTMLElement,
        { opacity: 1, y: 0, scale: 1, duration: 2.0 },
        1.4
      );
    } else if (type === 'chart-legend') {
      timeline.fromTo(
        child as HTMLElement,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        0.6
      ).to(
        child as HTMLElement,
        { opacity: 1, y: 0, duration: 2.0 },
        1.6
      );
    }

    timeline.addPause(1.5); // Pause after animating each child for emphasis
  });

  section.querySelectorAll('.image-section .staggered-image').forEach((image, index) => {
    animate_section_image(image as HTMLElement, timeline, index);
  });

  return timeline;
}

function animate_section_image(image: HTMLElement, timeline: gsap.core.Timeline, index: number) {
  const appearTime = IMAGES_DELAY * index;
  // Alternate rotation direction for visual interest
  const rotationAngle = index % 2 === 0 ? -50 : 50;
  const finalRotation = index % 2 === 0 ? -5 : 5;

  console.log(`Animating image with index ${index}:`, image);
  timeline.fromTo(
    image,
    {
      opacity: 0,
      scale: 0.0,
      rotate: rotationAngle,
      duration: 0.3,
    },
    {
      opacity: 1,
      scale: 1,
      rotate: finalRotation,
    },
    appearTime
  ).to(
    image,
    {
      opacity: 1,
    },
    IMAGES_DURATION - appearTime
  );
}

function animate_section_title(child: HTMLElement, timeline: gsap.core.Timeline) {
  timeline.fromTo(
    child,
    {
      opacity: 0,
      x: "-50px",
      duration: 1,
    },
    {
      opacity: 1,
      x: 0,
      duration: INTRO_DURATION
    },
    INTRO_APPEAR_TIME
  )
}

function animate_section_text(child: HTMLElement, timeline: gsap.core.Timeline) {
  timeline.fromTo(
    child,
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
    INTRO_APPEAR_TIME + 0.5
  );
}


// ===== QUIZ ANIMATION FUNCTION =====
function animate_quiz_section(timeline: gsap.core.Timeline, element: HTMLElement): gsap.core.Timeline {
  // Animate quiz container
  let container = element.querySelector('.quiz-container') as HTMLElement;
  if (!container) {
    console.warn(`No .quiz-container found within "${element}". Skipping quiz animation.`);
    return timeline; // Return existing timeline to avoid errors
  }

  let title = container.querySelector('.quiz-title') as HTMLElement;
  if (!title) {
    console.warn(`No .quiz-title found within "${element}". Skipping quiz title animation.`);
    return timeline; // Return existing timeline to avoid errors
  }

  timeline.fromTo(
    container,
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
    container,
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 3.0,
    },
    1.0
  );

  // Animate quiz title
  timeline.fromTo(
    title,
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
    title,
    {
      opacity: 1,
      x: 0,
      duration: 3.0,
    },
    1.25
  );

  return timeline;
}

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

// Refresh ScrollTrigger after all timelines are created to ensure proper calculations
ScrollTrigger.refresh();
ScrollTrigger.normalizeScroll(); // Optional: Normalize scroll behavior across browsers for smoother experience