// ── Mobile nav toggle ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('header nav a');

function updateActive() {
    const scrollY = window.scrollY + 120;

    sections.forEach(sec => {
        if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
            navItems.forEach(a => a.classList.remove('active'));
            const link = document.querySelector(`header nav a[href="#${sec.id}"]`);
            if (link) link.classList.add('active');
        }
    });

    // Close mobile nav on scroll
    navLinks.classList.remove('open');
}

window.addEventListener('scroll', updateActive, { passive: true });

// ── Scroll reveal with IntersectionObserver ──
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .stagger').forEach(el => observer.observe(el));

// ── Trigger home section reveals immediately (above the fold) ──
document.querySelectorAll('#home .reveal, #home .stagger').forEach(el => el.classList.add('visible'));