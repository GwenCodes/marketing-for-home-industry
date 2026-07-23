import "./styles.css";

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     FOOTER YEAR
     ========================================================= */

  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =========================================================
     STICKY HEADER SHADOW ON SCROLL
     ========================================================= */

  const header = document.getElementById("siteHeader");

  const onScroll = () => {
    if (!header) return;

    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, {
    passive: true,
  });

  // Run once when page loads
  onScroll();

  /* =========================================================
     MOBILE MENU TOGGLE
     ========================================================= */

  const menuToggle = document.getElementById("menuToggle");

  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");

      menuToggle.classList.toggle("is-open", isOpen);

      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    /* =======================================================
       CLOSE MOBILE MENU AFTER CLICKING NAV LINK
    ======================================================= */

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("is-open");

        menuToggle.classList.remove("is-open");

        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================================================
     SMOOTH SCROLL FOR INTERNAL LINKS
     
     This handles links such as:
     #home
     #audience
     #spotlight-pack
     #faq
     ========================================================= */

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");

      // Ignore empty anchors
      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      // If the target doesn't exist,
      // allow the browser to handle the link normally.
      if (!target) {
        return;
      }

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =========================================================
     FAQ ACCORDION
     
     The HTML uses native <details> elements.
     This keeps only one FAQ open at a time.
     ========================================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      // Only do something when this FAQ is opened.
      if (!item.open) {
        return;
      }

      // Close all other FAQ items.
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.open) {
          otherItem.open = false;
        }
      });
    });
  });

  /* =========================================================
     BOOK NOW BUTTON
     
     The current homepage Book Now buttons
     link directly to:

     /intake.html

     Therefore, no JavaScript action is required.

     This listener is only here if you later
     add an element with id="book-now".
     ========================================================= */

  const bookNowBtn = document.getElementById("book-now");

  if (bookNowBtn) {
    bookNowBtn.addEventListener("click", () => {
      console.log("Book Now button clicked.");
    });
  }
});
