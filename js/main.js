(function () {
  'use strict';

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');
  var backdrop = document.getElementById('navBackdrop');

  function closeNav() {
    nav.classList.remove('open');
    backdrop.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function openNav() {
    nav.classList.add('open');
    backdrop.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.contains('open');
    if (isOpen) { closeNav(); } else { openNav(); }
  });
  backdrop.addEventListener('click', closeNav);
  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeNav();
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Back to top ---------- */
  var backTop = document.getElementById('backTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 600) {
      backTop.hidden = false;
      requestAnimationFrame(function () { backTop.classList.add('visible'); });
    } else {
      backTop.classList.remove('visible');
    }
  }, { passive: true });
  backTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Gallery lightbox ---------- */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
  var lightbox = document.getElementById('lightbox');
  var lbImage = document.getElementById('lbImage');
  var lbCaption = document.getElementById('lbCaption');
  var lbClose = document.getElementById('lbClose');
  var lbPrev = document.getElementById('lbPrev');
  var lbNext = document.getElementById('lbNext');
  var currentIndex = 0;

  function showPhoto(index) {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    var item = galleryItems[currentIndex];
    lbImage.src = item.getAttribute('data-full');
    lbImage.alt = item.querySelector('img').alt;
    lbCaption.textContent = item.getAttribute('data-caption') || '';
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
      showPhoto(index);
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  lbPrev.addEventListener('click', function () { showPhoto(currentIndex - 1); });
  lbNext.addEventListener('click', function () { showPhoto(currentIndex + 1); });
  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPhoto(currentIndex - 1);
    if (e.key === 'ArrowRight') showPhoto(currentIndex + 1);
  });

  /* ---------- Quote form (visual only, no backend yet) ---------- */
  var form = document.getElementById('quoteForm');
  var formNote = document.getElementById('formNote');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.querySelectorAll('input, select, textarea, button').forEach(function (el) { el.disabled = true; });
    formNote.hidden = false;
  });
})();
