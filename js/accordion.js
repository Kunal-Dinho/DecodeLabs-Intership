/* ============================================
   NTESHIP — FAQ Accordion
   Smooth height-animated accordion with
   single-open behavior and accessibility
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;

    /* ============ OPEN ACCORDION ITEM ============ */
    function openAccordion(item) {
        const answer = item.querySelector('.faq-answer');
        const question = item.querySelector('.faq-question');

        if (!answer || !question) return;

        // Get the full height of the content
        const answerContent = answer.querySelector('p');
        if (!answerContent) return;

        const contentHeight = answerContent.offsetHeight + 32; // 32 = padding (16px top + 16px bottom from the p tag already has padding, but answer adds padding via p)

        // Actually the p has padding: 0 var(--space-6) var(--space-5)
        // padding-bottom is var(--space-5) = 1.25rem = 20px
        // Plus the p's line-height contributes to height
        // We need to measure accurately
        answer.style.maxHeight = contentHeight + 'px';
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
    }

    /* ============ CLOSE ACCORDION ITEM ============ */
    function closeAccordion(item) {
        const answer = item.querySelector('.faq-answer');
        const question = item.querySelector('.faq-question');

        if (!answer || !question) return;

        answer.style.maxHeight = '0';
        item.classList.remove('active');
        question.setAttribute('aria-expanded', 'false');
    }

    /* ============ TOGGLE ACCORDION ============ */
    function toggleAccordion(item) {
        const isActive = item.classList.contains('active');

        // Close all other items first (single-open behavior)
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                closeAccordion(otherItem);
            }
        });

        // Toggle clicked item
        if (isActive) {
            closeAccordion(item);
        } else {
            openAccordion(item);
        }
    }

    /* ============ SETUP EVENT LISTENERS ============ */
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        // Set initial state
        question.setAttribute('aria-expanded', 'false');

        question.addEventListener('click', (e) => {
            e.preventDefault();
            toggleAccordion(item);
        });

        // Keyboard support: Enter and Space
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(item);
            }
        });
    });

    /* ============ HANDLE WINDOW RESIZE ============ */
    // If an item is open and window resizes, recalculate height
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            faqItems.forEach(item => {
                if (item.classList.contains('active')) {
                    const answer = item.querySelector('.faq-answer');
                    const answerContent = answer?.querySelector('p');
                    if (answer && answerContent) {
                        const contentHeight = answerContent.offsetHeight + 32;
                        answer.style.maxHeight = contentHeight + 'px';
                    }
                }
            });
        }, 200);
    });

    /* ============ OPEN FIRST FAQ ITEM BY DEFAULT ============ */
    // Uncomment the line below if you want the first item open by default
    // if (faqItems.length > 0) openAccordion(faqItems[0]);
});