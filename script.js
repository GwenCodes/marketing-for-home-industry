document.addEventListener("DOMContentLoaded", () => {
  /* ---------- footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- sticky header shadow on scroll ---------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => {
    if (header) {
      if (window.scrollY > 8) header.classList.add("is-scrolled");
      else header.classList.remove("is-scrolled");
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu toggle ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // close mobile menu after tapping a nav link
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");
        menuToggle.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- booking tabs ---------- */
  const packBtn = document.getElementById("tabBtnPack");
  const customBtn = document.getElementById("tabBtnCustom");
  const packPanel = document.getElementById("panel-pack");
  const customPanel = document.getElementById("panel-custom");
  const paymentWrapper = document.getElementById("paymentWrapper");

  if (packBtn && customBtn && packPanel && customPanel && paymentWrapper) {
    packBtn.addEventListener("click", () => {
      packPanel.classList.add("is-active");
      customPanel.classList.remove("is-active");
      paymentWrapper.style.display = "flex";
      packBtn.classList.add("is-active");
      customBtn.classList.remove("is-active");
    });

    customBtn.addEventListener("click", () => {
      customPanel.classList.add("is-active");
      packPanel.classList.remove("is-active");
      paymentWrapper.style.display = "none";
      customBtn.classList.add("is-active");
      packBtn.classList.remove("is-active");
    });
  }

  /* =========================================================
     PAYMENT LINK — REPLACE BEFORE GOING LIVE
     Swap this with your real Stripe Payment Link, PayPal.me
     link, or checkout URL. Until then the form simply confirms
     the booking and the button does not charge anyone.
     ========================================================= */
  const PAYMENT_LINK_URL =
    "https://buy.stripe.com/REPLACE_WITH_YOUR_PAYMENT_LINK";

  /* =========================================================
     FORM SUBMISSION ENDPOINT — REPLACE BEFORE GOING LIVE
     Point this at a form backend (Formspree, EmailJS, Netlify
     Forms, etc.) to actually receive these submissions by
     email. Right now submissions only show a confirmation
     message in the browser and are not sent anywhere.
     ========================================================= */
  const FORM_ENDPOINT_URL =
    "https://example.com/REPLACE_WITH_YOUR_FORM_ENDPOINT";

  function handleFormSubmit(form, confirmEl, message, redirectToPayment) {
    if (!form || !confirmEl) return; // Prevent errors if elements don't exist

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const required = form.querySelectorAll("[required]");
      let valid = true;
      required.forEach((field) => {
        if (!field.value.trim()) valid = false;
      });
      if (!valid) {
        confirmEl.textContent =
          "Please fill in your name, email, and business name.";
        confirmEl.style.color = "#C6612B";
        return;
      }

      confirmEl.textContent = message;

      if (redirectToPayment) {
        // Hand off to the real payment link once it's configured above.
        window.open(PAYMENT_LINK_URL, "_blank", "noopener");
      }

      form.reset();

      const packPhotos = document.getElementById("packPhotos");
      if (form.id === "formPack" && packPhotos) {
        packPhotos.value = 5;
      }
    });
  }

  const formPack = document.getElementById("formPack");
  const formCustom = document.getElementById("formCustom");

  handleFormSubmit(
    formPack,
    document.getElementById("packConfirm"),
    "Thanks! Opening secure checkout — once you're done, you'll get your private photo upload link by email.",
    true,
  );

  handleFormSubmit(
    formCustom,
    document.getElementById("customConfirm"),
    "Got it — thanks! I'll follow up within 1 business day with next steps.",
    false,
  );
});
let currentStep = 1;
let selectedPackage = null;
let selectedPrice = 0;

function showStep(step) {
  document
    .querySelectorAll(".booking-step")
    .forEach((el) => el.classList.add("hidden"));
  document.getElementById("step" + step).classList.remove("hidden");

  // progress update
  for (let i = 1; i <= 3; i++) {
    document.getElementById("stepIndicator" + i).classList.remove("active");
  }
  document.getElementById("stepIndicator" + step).classList.add("active");

  currentStep = step;
}

function nextStep(step) {
  showStep(step + 1);
}

function prevStep(step) {
  showStep(step - 1);
}

function selectPackage(name, price) {
  selectedPackage = name;
  selectedPrice = price;

  document.getElementById("summary").innerHTML =
    `Selected: <strong>${name}</strong> — $${price}`;

  renderPayPal(price);
}

function renderPayPal(amount) {
  document.getElementById("paypal-container").innerHTML = "";

  paypal
    .HostedButtons({
      hostedButtonId: "YOUR_BUTTON_ID",
      onApprove: function () {
        alert("Payment successful. I'll contact you shortly.");
      },
    })
    .render("#paypal-container");
}
