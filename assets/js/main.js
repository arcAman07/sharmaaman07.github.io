// Theme toggle — defaults to light
const html = document.documentElement;
const toggleBtn = document.getElementById('light-toggle');

function setTheme(t) {
    html.classList.add('transition');
    html.setAttribute('data-theme', t);
    if (toggleBtn) {
        toggleBtn.innerHTML = t === 'dark'
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }
    localStorage.setItem('theme', t);
    setTimeout(() => html.classList.remove('transition'), 800);
}

// Load: saved > light (always default light)
const saved = localStorage.getItem('theme');
if (saved) setTheme(saved);
// No auto-dark from system preference — user asked for light default

if (toggleBtn) {
    toggleBtn.onclick = () => setTheme(html.dataset.theme === 'dark' ? 'light' : 'dark');
}

// Mobile menu
const menuBtn = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
if (menuBtn && navMenu) {
    menuBtn.onclick = () => navMenu.classList.toggle('open');
    navMenu.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => navMenu.classList.remove('open'))
    );
}

// Active nav link
function setActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav-menu a').forEach(a => {
        const href = a.getAttribute('href');
        if (path.endsWith('/') && href.endsWith('index.html')) {
            a.classList.add('active');
        } else if (href && path.includes(href.replace('.html', ''))) {
            a.classList.add('active');
        }
    });
}
setActiveNav();

// Progress bar
const bar = document.getElementById('progress');
if (bar) {
    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - innerHeight;
        bar.style.width = h > 0 ? (scrollY / h * 100) + '%' : '0%';
    }, { passive: true });
}
