document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Year in footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.classList.toggle('nav-open', isOpen);
    });
  }

  /* ---------- About-us dropdown (mobile tap / desktop hover via CSS) ---------- */
  document.querySelectorAll('.has-dropdown > button').forEach(btn => {
    btn.addEventListener('click', () => {
      const li = btn.closest('.has-dropdown');
      const isOpen = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  });

  /* close mobile nav when a link is clicked */
  document.querySelectorAll('.main-nav a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', false);
      document.body.classList.remove('nav-open');
    });
  });

  /* =========================================================
     HERO SLIDER
     ========================================================= */
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsWrap = document.getElementById('hero-dots');
  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  let heroIndex = 0;
  let heroTimer;

  if (slides.length && dotsWrap) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });

    function render() {
      slides.forEach((s, i) => s.classList.toggle('active', i === heroIndex));
      Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === heroIndex));
    }
    function goToSlide(i) {
      heroIndex = (i + slides.length) % slides.length;
      render();
      resetTimer();
    }
    function nextSlide() { goToSlide(heroIndex + 1); }
    function prevSlide() { goToSlide(heroIndex - 1); }
    function resetTimer() {
      clearInterval(heroTimer);
      heroTimer = setInterval(nextSlide, 6000);
    }

    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);
    resetTimer();
  }

  /* =========================================================
     TESTIMONIAL SLIDER
     ========================================================= */
  const tSlides = Array.from(document.querySelectorAll('.t-slide'));
  const tDotsWrap = document.getElementById('t-dots');
  let tIndex = 0;
  let tTimer;

  if (tSlides.length && tDotsWrap) {
    tSlides.forEach((_, i) => {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Show message ${i + 1}`);
      dot.addEventListener('click', () => goToT(i));
      tDotsWrap.appendChild(dot);
    });

    function renderT() {
      tSlides.forEach((s, i) => s.classList.toggle('active', i === tIndex));
      Array.from(tDotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === tIndex));
    }
    function goToT(i) {
      tIndex = (i + tSlides.length) % tSlides.length;
      renderT();
      resetTTimer();
    }
    function resetTTimer() {
      clearInterval(tTimer);
      tTimer = setInterval(() => goToT(tIndex + 1), 5500);
    }
    resetTTimer();
  }

  /* =========================================================
     STAT COUNTERS (animate when in view)
     ========================================================= */
  const statEls = document.querySelectorAll('.stat .num');
  if (statEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        const duration = 1400;
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target).toLocaleString();
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    }, { threshold: 0.4 });
    statEls.forEach(el => observer.observe(el));
  }

  /* =========================================================
     BACK TO TOP
     ========================================================= */
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('show', window.scrollY > 500);
    });
    backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* close mobile dropdown/nav on outside click */
  document.addEventListener('click', (e) => {
    if (mainNav && !mainNav.contains(e.target) && !navToggle?.contains(e.target)) {
      mainNav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', false);
      document.body.classList.remove('nav-open');
    }
  });
});
