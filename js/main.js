// Portfolio Minimalista — Main JS

(function () {
  "use strict";

  // --- DOM Elements ---
  const navbar = document.getElementById("navbar");
  const toggle = document.querySelector(".navbar__toggle");
  const navLinks = document.querySelector(".navbar__links");
  const navAnchors = document.querySelectorAll(".navbar__links a");
  const sections = document.querySelectorAll("main section[id]");

  // --- Navbar Scroll Effect ---
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar--scrolled");
    } else {
      navbar.classList.remove("navbar--scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // --- Mobile Menu Toggle ---
  function openMenu() {
    navLinks.classList.add("navbar__links--open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fechar menu");
  }

  function closeMenu() {
    navLinks.classList.remove("navbar__links--open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  }

  function toggleMenu() {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  toggle.addEventListener("click", toggleMenu);

  // Close menu on link click (mobile)
  navAnchors.forEach(function (anchor) {
    anchor.addEventListener("click", function () {
      closeMenu();
    });
  });

  // Close menu on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeMenu();
    }
  });

  // --- Active Link Highlight via Intersection Observer ---
  function setActiveLink(id) {
    navAnchors.forEach(function (anchor) {
      if (anchor.getAttribute("href") === "#" + id) {
        anchor.classList.add("active");
      } else {
        anchor.classList.remove("active");
      }
    });
  }

  var observerOptions = {
    root: null,
    rootMargin: "-20% 0px -60% 0px",
    threshold: 0,
  };

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // --- Global Scroll Reveal System ---
  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // Single global Intersection Observer for all .reveal elements
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.15 },
  );

  // Skills categories: observe parent, reveal children with staggered --delay
  var skillsCategories = document.querySelectorAll(".skills__category");
  var skillsGroupObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var cards = entry.target.querySelectorAll(".skills__card");
          cards.forEach(function (card, index) {
            card.style.setProperty("--delay", index * 0.1 + "s");
            card.classList.add("visible");
          });
          skillsGroupObserver.unobserve(entry.target);
        }
      });
    },
    { root: null, threshold: 0.15 },
  );

  // Initialize reveal elements (skip if reduced motion)
  function initRevealSystem() {
    if (prefersReducedMotion) return;

    // About section columns
    var aboutElements = document.querySelectorAll(
      ".about__photo-col, .about__text-col",
    );
    aboutElements.forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });

    // Experience items: slide-in from left on desktop, fade-up on mobile
    var experienceItems = document.querySelectorAll(".experience__item");
    var isDesktop = window.matchMedia("(min-width: 768px)").matches;
    experienceItems.forEach(function (item, index) {
      item.classList.add("reveal");
      if (isDesktop) {
        item.classList.add("reveal--left");
      }
      item.style.setProperty("--delay", index * 0.2 + "s");
      revealObserver.observe(item);
    });

    // Contact section columns
    var contactElements = document.querySelectorAll(
      ".contact__form-col, .contact__info-col",
    );
    contactElements.forEach(function (el) {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });

    // Section dividers: scroll reveal
    var dividers = document.querySelectorAll(".section-divider");
    dividers.forEach(function (divider) {
      revealObserver.observe(divider);
    });

    // Skills cards: staggered reveal per category group
    skillsCategories.forEach(function (category) {
      var cards = category.querySelectorAll(".skills__card");
      cards.forEach(function (card) {
        card.classList.add("reveal");
      });
      skillsGroupObserver.observe(category);
    });
  }

  initRevealSystem();

  // --- Contact Form Validation ---
  var contactForm = document.getElementById("contact-form");
  var contactSuccess = document.getElementById("contact-success");

  if (contactForm) {
    var nameInput = document.getElementById("contact-name");
    var emailInput = document.getElementById("contact-email");
    var messageInput = document.getElementById("contact-message");

    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function showError(input, message) {
      input.classList.add("contact__input--error");
      var errorSpan = input.parentElement.querySelector(".contact__error");
      if (errorSpan) {
        errorSpan.textContent = message;
      }
    }

    function clearError(input) {
      input.classList.remove("contact__input--error");
      var errorSpan = input.parentElement.querySelector(".contact__error");
      if (errorSpan) {
        errorSpan.textContent = "";
      }
    }

    function validateForm() {
      var valid = true;

      // Name: min 2 chars
      if (nameInput.value.trim().length < 2) {
        showError(nameInput, "Nome deve ter pelo menos 2 caracteres.");
        valid = false;
      } else {
        clearError(nameInput);
      }

      // Email: regex
      if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Informe um email válido.");
        valid = false;
      } else {
        clearError(emailInput);
      }

      // Message: min 10 chars
      if (messageInput.value.trim().length < 10) {
        showError(messageInput, "Mensagem deve ter pelo menos 10 caracteres.");
        valid = false;
      } else {
        clearError(messageInput);
      }

      return valid;
    }

    // --- EmailJS Config (loaded from config.js) ---

    var submitBtn = contactForm.querySelector(".contact__submit");
    var submitBtnText = submitBtn.textContent.trim();

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      // Disable button and show loading
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      var templateParams = {
        from_name: nameInput.value.trim(),
        from_email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        to_email: "matheussouzabraga1@gmail.com",
      };

      emailjs
        .send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY,
        )
        .then(function () {
          // Clear form
          nameInput.value = "";
          emailInput.value = "";
          messageInput.value = "";
          updateCharCount();

          // Show success message
          contactSuccess.textContent = "Mensagem enviada com sucesso!";
          contactSuccess.classList.add("contact__success--visible");

          setTimeout(function () {
            contactSuccess.classList.remove("contact__success--visible");
            contactSuccess.textContent = "";
          }, 5000);
        })
        .catch(function () {
          contactSuccess.textContent =
            "Erro ao enviar. Tente novamente mais tarde.";
          contactSuccess.style.color = "#e57373";
          contactSuccess.classList.add("contact__success--visible");

          setTimeout(function () {
            contactSuccess.classList.remove("contact__success--visible");
            contactSuccess.textContent = "";
            contactSuccess.style.color = "";
          }, 5000);
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = submitBtnText;
        });
    });

    // --- Character Counter for Message ---
    var charCount = document.querySelector(".contact__char-count");
    var maxLength = 500;

    function updateCharCount() {
      var len = messageInput.value.length;
      charCount.textContent = len + " / " + maxLength;
      charCount.classList.remove(
        "contact__char-count--warn",
        "contact__char-count--limit",
      );
      if (len >= maxLength) {
        charCount.classList.add("contact__char-count--limit");
      } else if (len >= maxLength * 0.9) {
        charCount.classList.add("contact__char-count--warn");
      }
    }

    messageInput.addEventListener("input", updateCharCount);

    // Clear errors on input
    [nameInput, messageInput].forEach(function (input) {
      input.addEventListener("input", function () {
        clearError(input);
      });
    });

    // Real-time email validation
    emailInput.addEventListener("input", function () {
      var value = emailInput.value.trim();
      if (value === "") {
        clearError(emailInput);
      } else if (!emailRegex.test(value)) {
        showError(emailInput, "Informe um email válido.");
      } else {
        clearError(emailInput);
      }
    });
  }

  // --- Visit Counter (Firebase — config loaded from config.js) ---
  if (typeof firebase !== "undefined" && typeof FIREBASE_CONFIG !== "undefined" && !sessionStorage.getItem("visited")) {
    firebase.initializeApp(FIREBASE_CONFIG);
    var db = firebase.database();
    var visitsRef = db.ref("visits/count");

    visitsRef.transaction(
      function (currentCount) {
        return (currentCount || 0) + 1;
      },
      function (error, committed, snapshot) {
        if (error || !committed) return;

        sessionStorage.setItem("visited", "true");

        var count = snapshot.val();
        if (count % 10 === 0) {
          emailjs.send(
            EMAILJS_SERVICE_ID,
            VISIT_EMAILJS_TEMPLATE_ID,
            {
              visit_count: count,
              to_email: "matheussouzabraga1@gmail.com",
            },
            EMAILJS_PUBLIC_KEY,
          );
        }
      },
    );
  }

  // --- Footer Dynamic Year ---
  var footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // --- Back to Top Button ---
  var backToTop = document.getElementById("back-to-top");

  function handleBackToTopVisibility() {
    if (window.scrollY > 500) {
      backToTop.classList.add("back-to-top--visible");
    } else {
      backToTop.classList.remove("back-to-top--visible");
    }
  }

  window.addEventListener("scroll", handleBackToTopVisibility, {
    passive: true,
  });
  handleBackToTopVisibility();

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
