// ==========================================
// Resume — Interactive Scripts
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Sticky Navbar (show after scrolling past hero) ---
    const navbar = document.getElementById('navbar');
    const hero = document.getElementById('hero');

    const navObserver = new IntersectionObserver(
        ([entry]) => {
            navbar.classList.toggle('visible', !entry.isIntersecting);
        },
        { threshold: 0.1 }
    );
    navObserver.observe(hero);

    // --- Mobile Nav Toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll(
        '.about-card, .skill-card, .timeline-item, .project-card, .contact-card'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Staggered animation
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 80);
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Skill Bar Animation ---
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                    skillObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    skillBars.forEach(bar => skillObserver.observe(bar));

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = navbar.classList.contains('visible') ? 70 : 0;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Active nav link highlight ---
    const sections = document.querySelectorAll('.section');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinkItems.forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        },
        { threshold: 0.3 }
    );

    sections.forEach(section => sectionObserver.observe(section));
});
