/* ============================================
   NTESHIP — Testimonials Slider
   Auto-advancing slider with dot navigation
   and arrow controls
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('testimonial-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoPlayInterval;
    const AUTO_PLAY_DELAY = 5000; // 5 seconds

    /* ============ GO TO SLIDE ============ */
    function goToSlide(index) {
        // Remove active from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => {
            dot.classList.remove('active');
            dot.setAttribute('aria-selected', 'false');
        });

        // Set active slide and dot
        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
            dots[index].setAttribute('aria-selected', 'true');
        }

        currentIndex = index;
    }

    /* ============ NEXT SLIDE ============ */
    function nextSlide() {
        const next = (currentIndex + 1) % slides.length;
        goToSlide(next);
    }

    /* ============ PREV SLIDE ============ */
    function prevSlide() {
        const prev = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    /* ============ AUTO PLAY ============ */
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(nextSlide, AUTO_PLAY_DELAY);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            autoPlayInterval = null;
        }
    }

    /* ============ EVENT LISTENERS ============ */
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoPlay(); // Reset auto-play timer
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoPlay(); // Reset auto-play timer
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index !== currentIndex) {
                goToSlide(index);
                startAutoPlay(); // Reset auto-play timer
            }
        });
    });

    // Pause auto-play on hover
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', stopAutoPlay);
        sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
            startAutoPlay();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
            startAutoPlay();
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            startAutoPlay();
        }
    }, { passive: true });

    /* ============ INIT ============ */
    goToSlide(0);
    startAutoPlay();
});