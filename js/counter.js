/* ============================================
   NTESHIP — Animated Counter
   IntersectionObserver-based number counter
   that animates from 0 to target value
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length === 0) return;

    /* ============ COUNTER FUNCTION ============ */
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const duration = 2000; // 2 seconds
        const startTime = performance.now();
        const startValue = 0;

        // Clear existing text content but keep the element structure
        element.textContent = '0';

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(eased * target);

            element.textContent = currentValue.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(updateCounter);
    }

    /* ============ INTERSECTION OBSERVER ============ */
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                // Prevent re-triggering
                counterObserver.unobserve(number);

                // Small delay for staggered effect
                const index = Array.from(statNumbers).indexOf(number);
                setTimeout(() => {
                    animateCounter(number);
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all stat-number elements
    statNumbers.forEach(number => {
        counterObserver.observe(number);
    });
});