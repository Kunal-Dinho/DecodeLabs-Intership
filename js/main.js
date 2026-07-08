/* ============================================
   NTESHIP — Main JavaScript
   Navigation, Dark Mode, Scroll Progress,
   Back to Top, Form Validation, Ripple Effect,
   Typing Effect, Scroll Reveal, Course Search/Filter
   ============================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    /* ============ LOADING OVERLAY ============ */
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingOverlay.classList.add('hidden');
            }, 500);
        });
        // Fallback: hide after 3s if load event is slow
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 3000);
    }

    /* ============ MOBILE NAVIGATION ============ */
    const hamburger = document.getElementById('hamburger');
    const header = document.getElementById('header');

    function createMobileMenu() {
        const existing = document.querySelector('.mobile-menu');
        if (existing) existing.remove();

        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';
        mobileMenu.id = 'mobile-menu';

        const links = document.querySelectorAll('.nav-links .nav-link');
        links.forEach(link => {
            const clone = link.cloneNode(true);
            clone.addEventListener('click', closeMobileMenu);
            mobileMenu.appendChild(clone);
        });

        const loginBtn = document.querySelector('.nav-actions .btn-ghost');
        if (loginBtn) {
            const clone = loginBtn.cloneNode(true);
            clone.style.marginTop = 'var(--space-4)';
            mobileMenu.appendChild(clone);
        }

        const signupBtn = document.querySelector('.nav-actions .btn-primary');
        if (signupBtn) {
            const clone = signupBtn.cloneNode(true);
            mobileMenu.appendChild(clone);
        }

        header.after(mobileMenu);
        return mobileMenu;
    }

    let mobileMenu = createMobileMenu();

    function openMobileMenu() {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    // Close mobile menu on window resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });

    /* ============ STICKY NAVBAR + SCROLL PROGRESS ============ */
    const scrollProgress = document.getElementById('scroll-progress');
    const backToTop = document.getElementById('back-to-top');

    function handleScroll() {
        const scrollY = window.scrollY;
        const winHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = winHeight > 0 ? (scrollY / winHeight) * 100 : 0;

        // Sticky navbar
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll progress bar
        if (scrollProgress) {
            scrollProgress.style.width = progress + '%';
            scrollProgress.setAttribute('aria-valuenow', Math.round(progress));
        }

        // Back to top
        if (backToTop) {
            if (scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============ DARK MODE TOGGLE ============ */
    const darkToggle = document.getElementById('dark-toggle');
    const storedTheme = localStorage.getItem('nteship-theme');

    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('nteship-theme', theme);
    }

    // Apply stored theme on load
    if (storedTheme === 'dark') {
        setTheme('dark');
    } else if (storedTheme === 'light') {
        setTheme('light');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
    }

    if (darkToggle) {
        darkToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const theme = current === 'dark' ? 'light' : 'dark';
            setTheme(theme);
        });
    }

    /* ============ TYPING EFFECT ============ */
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const phrases = [
            'Master in-demand skills with industry-designed courses and real-world projects.',
            'Get paired with mentors from Google, Microsoft & Amazon.',
            'Land paid internships at top tech companies.',
            'Join 10,000+ students who transformed their careers.'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentText = '';

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                currentText = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            typingElement.textContent = currentText;

            let typeSpeed = isDeleting ? 30 : 60;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    /* ============ SCROLL REVEAL (Intersection Observer) ============ */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    /* ============ RIPPLE BUTTON EFFECT ============ */
    document.querySelectorAll('.ripple-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    /* ============ COURSE SEARCH & FILTER ============ */
    const courseSearch = document.getElementById('course-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    function filterCourses() {
        const searchTerm = courseSearch ? courseSearch.value.toLowerCase().trim() : '';
        const activeFilter = document.querySelector('.filter-btn.active');
        const filterValue = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';

        courseCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const name = card.getAttribute('data-name') || card.querySelector('.course-title')?.textContent || '';
            const nameMatch = name.toLowerCase().includes(searchTerm);
            const categoryMatch = filterValue === 'all' || category === filterValue;

            if (nameMatch && categoryMatch) {
                card.style.display = '';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                requestAnimationFrame(() => {
                    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                });
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Search input
    if (courseSearch) {
        courseSearch.addEventListener('input', filterCourses);
    }

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            filterCourses();
        });
    });

    /* ============ CONTACT FORM VALIDATION ============ */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('form-name');
        const emailInput = document.getElementById('form-email');
        const phoneInput = document.getElementById('form-phone');
        const messageInput = document.getElementById('form-message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const phoneError = document.getElementById('phone-error');
        const messageError = document.getElementById('message-error');

        function validateName() {
            const value = nameInput.value.trim();
            if (value.length < 2) {
                nameInput.classList.add('error');
                nameError.textContent = 'Name must be at least 2 characters';
                return false;
            }
            nameInput.classList.remove('error');
            nameError.textContent = '';
            return true;
        }

        function validateEmail() {
            const value = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                emailInput.classList.add('error');
                emailError.textContent = 'Please enter a valid email address';
                return false;
            }
            emailInput.classList.remove('error');
            emailError.textContent = '';
            return true;
        }

        function validatePhone() {
            const value = phoneInput.value.trim();
            if (value && !/^[\d\s\+\-()]{7,15}$/.test(value)) {
                phoneInput.classList.add('error');
                phoneError.textContent = 'Please enter a valid phone number';
                return false;
            }
            phoneInput.classList.remove('error');
            phoneError.textContent = '';
            return true;
        }

        function validateMessage() {
            const value = messageInput.value.trim();
            if (value.length < 10) {
                messageInput.classList.add('error');
                messageError.textContent = 'Message must be at least 10 characters';
                return false;
            }
            messageInput.classList.remove('error');
            messageError.textContent = '';
            return true;
        }

        // Real-time validation on blur
        nameInput.addEventListener('blur', validateName);
        emailInput.addEventListener('blur', validateEmail);
        phoneInput.addEventListener('blur', validatePhone);
        messageInput.addEventListener('blur', validateMessage);

        // Clear errors on focus
        [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
            input.addEventListener('focus', () => {
                input.classList.remove('error');
                const errorEl = document.getElementById(input.id + '-error') ||
                    document.getElementById(input.id.replace('form-', '') + '-error');
                if (errorEl) errorEl.textContent = '';
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();
            const isMessageValid = validateMessage();

            if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    submitBtn.textContent = '✓ Message Sent!';
                    submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        contactForm.reset();
                    }, 2000);
                }, 1500);
            }
        });
    }

    /* ============ NEWSLETTER FORM ============ */
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const email = input.value.trim();

            if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                const btn = this.querySelector('button');
                btn.textContent = '✓ Subscribed';
                btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
                input.value = '';

                setTimeout(() => {
                    btn.textContent = 'Subscribe';
                    btn.style.background = '';
                }, 3000);
            } else {
                input.style.borderColor = 'var(--error)';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });
    }

    /* ============ SMOOTH ANCHOR SCROLLING ============ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (mobileMenu.classList.contains('open')) {
                    closeMobileMenu();
                }
            }
        });
    });

    /* ============ ACTIVE NAV LINK ON SCROLL ============ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    /* ============ PARALLAX HERO EFFECT ============ */
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const particles = heroSection.querySelector('.hero-particles');
            if (particles && scrollY < window.innerHeight) {
                particles.style.transform = `translateY(${scrollY * 0.1}px)`;
            }
        }, { passive: true });
    }

    /* ============ DASHBOARD PARALLAX (MOUSE) ============ */
    const dashboard = document.getElementById('dashboard-illustration');
    if (dashboard && window.innerWidth >= 768) {
        dashboard.addEventListener('mousemove', (e) => {
            const rect = dashboard.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const cards = dashboard.querySelectorAll('.dashboard-card');
            cards.forEach((card, i) => {
                const speed = 5 + i * 3;
                card.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });

            const chart = dashboard.querySelector('.dash-chart');
            if (chart) {
                chart.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
            }

            const badges = dashboard.querySelectorAll('.floating-badge');
            badges.forEach((badge, i) => {
                const speed = 10 + i * 5;
                badge.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });

        dashboard.addEventListener('mouseleave', () => {
            const elements = dashboard.querySelectorAll('.dashboard-card, .dash-chart, .floating-badge');
            elements.forEach(el => {
                el.style.transition = 'transform 0.5s ease';
                el.style.transform = '';
                setTimeout(() => {
                    el.style.transition = '';
                }, 500);
            });
        });
    }

    /* ============ ACTIVE NAV LINK STYLE ============ */
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--primary);
            background: var(--primary-bg);
        }
    `;
    document.head.appendChild(style);
});