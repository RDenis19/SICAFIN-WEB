const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const navToggle = document.querySelector('[data-nav-toggle]');

function syncHeader() {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 8);
}

syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

function closeNav() {
  if (!nav || !navToggle) return;
  nav.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
}

if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(event.target) || navToggle.contains(event.target)) return;
    closeNav();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });
}

const page = document.documentElement.dataset.page || document.body.dataset.page;
if (page && nav) {
  nav.querySelectorAll('[data-page]').forEach((link) => {
    link.classList.toggle('is-active', link.dataset.page === page);
  });
}

const revealables = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealables.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
  revealables.forEach((item) => observer.observe(item));
} else {
  revealables.forEach((item) => item.classList.add('is-visible'));
}
