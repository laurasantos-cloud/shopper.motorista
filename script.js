const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

function closeMenu(){
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded','false');
}

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.addEventListener('click', (event) => {
  if (!nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const track = document.querySelector('.benefit-track');
const cards = Array.from(document.querySelectorAll('.benefit-card'));
const prev = document.querySelector('.carousel-btn.prev');
const next = document.querySelector('.carousel-btn.next');
let active = 1;
let timer;

function visibleCount(){
  return window.matchMedia('(max-width: 820px)').matches ? 1 : 3;
}

function updateCarousel(){
  const total = cards.length;

  cards.forEach((card, index) => {
    card.classList.remove('is-active', 'is-prev', 'is-next');

    const prevIndex = (active - 1 + total) % total;
    const nextIndex = (active + 1) % total;

    if (index === active) card.classList.add('is-active');
    if (index === prevIndex) card.classList.add('is-prev');
    if (index === nextIndex) card.classList.add('is-next');
  });

  track.style.transform = 'none';
}

function go(direction){
  active = (active + direction + cards.length) % cards.length;
  updateCarousel();
  restartTimer();
}

function restartTimer(){
  clearInterval(timer);
  timer = setInterval(() => go(1), 10000);
}

prev.addEventListener('click', () => go(-1));
next.addEventListener('click', () => go(1));
window.addEventListener('resize', updateCarousel);
updateCarousel();
restartTimer();
