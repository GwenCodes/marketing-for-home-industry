/* ===========================================================
   ESSEX DESIGNS — Landing Page Script
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- sticky header shadow on scroll ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 8) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu toggle ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  // close mobile menu after tapping a nav link
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- booking tabs ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = {
    pack: document.getElementById('panel-pack'),
    custom: document.getElementById('panel-custom'),
  };

  function activateTab(tabName) {
    tabBtns.forEach(btn => {
      const isMatch = btn.dataset.tab === tabName;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-selected', String(isMatch));
    });
    Object.entries(panels).forEach(([name, panel]) => {
      panel.classList.toggle('is-active', name === tabName);
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });

  // CTA buttons elsewhere on the page that should open a specific tab
  document.querySelectorAll('[data-tab-target]').forEach(link => {
    link.addEventListener('click', () => {
      activateTab(link.dataset.tabTarget);
    });
  });

  /* =========================================================
     PAYMENT LINK — REPLACE BEFORE GOING LIVE
     Swap this with your real Stripe Payment Link, PayPal.me
     link, or checkout URL. Until then the form simply confirms
     the booking and the button does not charge anyone.
     ========================================================= */
  const PAYMENT_LINK_URL = 'https://buy.stripe.com/REPLACE_WITH_YOUR_PAYMENT_LINK';

  /* =========================================================
     FORM SUBMISSION ENDPOINT — REPLACE BEFORE GOING LIVE
     Point this at a form backend (Formspree, EmailJS, Netlify
     Forms, etc.) to actually receive these submissions by
     email. Right now submissions only show a confirmation
     message in the browser and are not sent anywhere.
     ========================================================= */
  const FORM_ENDPOINT_URL = 'https://example.com/REPLACE_WITH_YOUR_FORM_ENDPOINT';

  function handleFormSubmit(form, confirmEl, message, redirectToPayment) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => {
        if (!field.value.trim()) valid = false;
      });
      if (!valid) {
        confirmEl.textContent = 'Please fill in your name, email, and business name.';
        confirmEl.style.color = '#C6612B';
        return;
      }

      confirmEl.textContent = message;

      if (redirectToPayment) {
        // Hand off to the real payment link once it's configured above.
        window.open(PAYMENT_LINK_URL, '_blank', 'noopener');
      }

      form.reset();
      if (form.id === 'formPack') document.getElementById('packPhotos').value = 5;
    });
  }

  const formPack = document.getElementById('formPack');
  const formCustom = document.getElementById('formCustom');

  handleFormSubmit(
    formPack,
    document.getElementById('packConfirm'),
    "Thanks! Opening secure checkout — once you're done, you'll get your private photo upload link by email.",
    true
  );

  handleFormSubmit(
    formCustom,
    document.getElementById('customConfirm'),
    "Got it — thanks! I'll follow up within 1 business day with next steps.",
    false
  );

});
