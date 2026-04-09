(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  const scrollTopButton = document.querySelector("#scroll-top");
  const yearNode = document.querySelector("#current-year");
  const contactForm = document.querySelector("#contact-form");
  const formHelper = document.querySelector("#form-helper");

  const closeMobileNav = () => {
    if (!siteNav || !navToggle) return;
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.innerHTML = '<i class="bi bi-list"></i>';
  };

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.innerHTML = isOpen ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMobileNav);
    });
  }

  const updateActiveSection = () => {
    const position = window.scrollY + 140;
    let currentId = sections[0]?.id || "hero";

    sections.forEach((section) => {
      if (position >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const target = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", target === currentId);
    });
  };

  const updateScrollTop = () => {
    if (!scrollTopButton) return;
    scrollTopButton.classList.toggle("active", window.scrollY > 400);
  };

  if (scrollTopButton) {
    scrollTopButton.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`
      );

      if (formHelper) {
        formHelper.textContent = "Opening your email app with a pre-filled message.";
      }

      window.location.href = `mailto:mabdullahsaeed188@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  if (window.AOS) {
    window.addEventListener("load", () => {
      AOS.init({
        duration: 700,
        easing: "ease-out-cubic",
        once: true,
        offset: 40
      });
    });
  }

  document.addEventListener("scroll", () => {
    updateActiveSection();
    updateScrollTop();
  });

  window.addEventListener("load", () => {
    updateActiveSection();
    updateScrollTop();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 840) {
      closeMobileNav();
    }
  });
})();