const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

const eventDate = new Date('2025-02-20T18:30:00+05:30').getTime();

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
  const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
};

updateCountdown();
setInterval(updateCountdown, 1000);

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('is-open');
  navToggle.classList.toggle('is-active');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.classList.remove('is-active');
  });
});

const carouselTrack = document.querySelector('.carousel__track');
const prevBtn = document.querySelector('.carousel__control--prev');
const nextBtn = document.querySelector('.carousel__control--next');
let currentSlide = 0;

const moveCarousel = (direction) => {
  const cards = carouselTrack.children.length;
  currentSlide = (currentSlide + direction + cards) % cards;
  const offset = -currentSlide * (carouselTrack.children[0].getBoundingClientRect().width + 24);
  carouselTrack.style.transform = `translateX(${offset}px)`;
};

prevBtn.addEventListener('click', () => moveCarousel(-1));
nextBtn.addEventListener('click', () => moveCarousel(1));

let autoSlide = setInterval(() => moveCarousel(1), 5000);

[prevBtn, nextBtn].forEach((btn) => {
  btn.addEventListener('mouseenter', () => clearInterval(autoSlide));
  btn.addEventListener('mouseleave', () => (autoSlide = setInterval(() => moveCarousel(1), 5000)));
});
