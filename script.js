const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const track = document.querySelector('.carousel-track');
const cards = Array.from(document.querySelectorAll('.benefit-card'));
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let index = 0;
let timer;

function whatsappLinks() {
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => {
    link.target = '_blank';
    link.rel = 'noopener';
  });
}

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 20);
}

function cardsPerView() {
  if (window.innerWidth <= 760) return 1;
  if (window.innerWidth <= 980) return 2;
  return 3;
}

function updateCarousel() {
  if (!track || !cards.length) return;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const width = cards[0].getBoundingClientRect().width + gap;
  const maxIndex = Math.max(0, cards.length - cardsPerView());
  if (index > maxIndex) index = 0;
  if (index < 0) index = maxIndex;
  track.style.transform = `translateX(-${index * width}px)`;
}

function startCarousel() {
  clearInterval(timer);
  timer = setInterval(() => {
    index += 1;
    updateCarousel();
  }, 4200);
}

next?.addEventListener('click', () => { index += 1; updateCarousel(); startCarousel(); });
prev?.addEventListener('click', () => { index -= 1; updateCarousel(); startCarousel(); });
window.addEventListener('resize', updateCarousel);
window.addEventListener('scroll', onScroll);

menuToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

window.addEventListener('load', () => {
  onScroll();
  updateCarousel();
  startCarousel();
  whatsappLinks();
  if (window.lucide) lucide.createIcons();
});
