// @ts-expect-error - Import needed for type annotations with verbatimModuleSyntax
import gsap from "gsap";

/**
 * Appends staggered animations for list items to an existing timeline
 * @param timeline - Existing GSAP timeline to append animations to
 * @param containerSelector - CSS selector for the container (e.g., ".background-info-page")
 * @param itemSelector - CSS selector for individual items (e.g., ".staggered-item")
 * @param duration - Total animation duration in seconds
 * @param itemDelay - Delay between each item animation in seconds
 * @param startTime - Position in the timeline where animations should start
 * @returns The updated timeline object
 */
export function createStaggeredTimeline(
    timeline: gsap.core.Timeline,
    container: HTMLElement,
    duration: number = 3.0,
    itemDelay: number = 0.5,
    startTime: number = 0
): gsap.core.Timeline {

    const items = container.querySelectorAll(".staggered-item");

    items.forEach((item, index) => {
        const appearTime = itemDelay * index;

        timeline.fromTo(
            item,
            {
                opacity: 0,
                x: "-50px",
                duration: 0.5,
            },
            {
                opacity: 1,
                x: 0,
            },
            startTime + appearTime
        ).to(
            item,
            {
                opacity: 1,
            },
            startTime + (duration - appearTime)
        );
    });

    return timeline;
}

/**
 * Appends staggered animations for images to an existing timeline
 * @param timeline - Existing GSAP timeline to append animations to
 * @param containerSelector - CSS selector for the container (e.g., ".background-info-page-images-1")
 * @param imageSelector - CSS selector for individual image containers (e.g., ".staggered-image")
 * @param duration - Total animation duration in seconds
 * @param itemDelay - Delay between each image animation in seconds
 * @param startTime - Position in the timeline where animations should start
 * @returns The updated timeline object
 */
export function createStaggeredImageTimeline(
    timeline: gsap.core.Timeline,
    containerSelector: string,
    imageSelector: string,
    duration: number = 2.5,
    itemDelay: number = 0.3,
    startTime: number = 0
): gsap.core.Timeline {

    const images = document.querySelectorAll(`${containerSelector} ${imageSelector}`);

    images.forEach((image, index) => {
        const appearTime = itemDelay * index;
        // Alternate rotation direction for visual interest
        const rotationAngle = index % 2 === 0 ? -50 : 50;
        const finalRotation = index % 2 === 0 ? -5 : 5;

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
            startTime + appearTime
        ).to(
            image,
            {
                opacity: 1,
            },
            startTime + (duration - appearTime)
        );
    });

    return timeline;
}
