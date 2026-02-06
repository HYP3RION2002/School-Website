document.addEventListener('DOMContentLoaded', () => {
  // Nav toggle for small screens
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const visible = mainNav.style.display === 'flex';
    mainNav.style.display = visible ? 'none' : 'flex';
  });

  // Slideshow gallery
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  const showSlide = (n) => {
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    const slideTitle = document.getElementById('slideTitle');
    if (slideTitle) {
      slideTitle.textContent = slides[currentSlide].getAttribute('data-title') || '';
    }
  };

  const nextSlide = () => {
    currentSlide++;
    showSlide(currentSlide);
  };

  const prevSlide = () => {
    currentSlide--;
    showSlide(currentSlide);
  };

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      currentSlide = Number(e.target.getAttribute('data-index'));
      showSlide(currentSlide);
    });
  });

  // Auto-advance slideshow every 5 seconds
  let slideTimer = setInterval(nextSlide, 5000);
  
  // Reset timer on manual navigation
  const resetTimer = () => {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 5000);
  };
  
  if (prevBtn) prevBtn.addEventListener('click', resetTimer);
  if (nextBtn) nextBtn.addEventListener('click', resetTimer);
  dots.forEach(dot => dot.addEventListener('click', resetTimer));

  // Show first slide
  showSlide(currentSlide);

  // Progress animation when visible
  const fills = document.querySelectorAll('.progress-fill');
  const values = document.querySelectorAll('.progress-value');
  const opts = {threshold: 0.3};
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fills.forEach((fill, i) => {
          const target = Number(fill.getAttribute('data-target')) || 0;
          fill.style.width = target + '%';
          values[i].textContent = target + '%';
        });
      }
    });
  }, opts);
  const progressSection = document.getElementById('progress');
  if (progressSection) observer.observe(progressSection);

  // Auto year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Contact form handling (demo - no backend)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formMessage = document.getElementById('formMessage');
      formMessage.textContent = 'Thanks — your message has been sent (demo).';
      contactForm.reset();
    });
  }

  // Admissions form handling (demo - no backend)
  const admissionsForm = document.getElementById('admissionsForm');
  if (admissionsForm) {
    admissionsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formMessage = document.getElementById('admissionsFormMessage');
      formMessage.textContent = 'Application received! We will review it and contact you soon.';
      admissionsForm.reset();
    });
  }
});
