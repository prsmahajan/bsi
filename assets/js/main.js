const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
}

const countdown = () => {
  const targetDate = new Date('2025-02-27T18:30:00+05:30').getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.querySelector('.countdown').textContent = 'The awards gala is live now!';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const setValue = (id, value) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = String(value).padStart(2, '0');
    }
  };

  setValue('days', days);
  setValue('hours', hours);
  setValue('minutes', minutes);
  setValue('seconds', seconds);
};

countdown();
setInterval(countdown, 1000);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  },
  {
    threshold: 0.2,
  }
);

document.querySelectorAll('.about-card, .category-card, .timeline-step, .winner-card, .testimonial, .logo-card').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});
