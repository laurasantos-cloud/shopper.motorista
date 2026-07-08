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
  const count = visibleCount();
  cards.forEach((card, index) => card.classList.toggle('is-active', index === active));
  if (count === 1) {
    track.style.transform = `translateX(-${active * 100}%)`;
  } else {
    const width = cards[0].getBoundingClientRect().width;
    const gap = 18;
    const offsetIndex = Math.max(0, Math.min(active - 1, cards.length - 3));
    track.style.transform = `translateX(-${offsetIndex * (width + gap)}px)`;
  }
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
