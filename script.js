// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem("color-theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && systemDark)) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const initTheme = () => {
  const isDark = document.documentElement.classList.contains("dark");

  // Update desktop icons
  const darkIconDesktop = document.getElementById("theme-toggle-dark-icon");
  const lightIconDesktop = document.getElementById("theme-toggle-light-icon");

  if (darkIconDesktop && lightIconDesktop) {
    darkIconDesktop.classList.toggle("hidden", !isDark);
    lightIconDesktop.classList.toggle("hidden", isDark);
  }

  // Update mobile icons
  const darkIconMobile = document.getElementById(
    "theme-toggle-dark-icon-mobile"
  );
  const lightIconMobile = document.getElementById(
    "theme-toggle-light-icon-mobile"
  );

  if (darkIconMobile && lightIconMobile) {
    darkIconMobile.classList.toggle("hidden", !isDark);
    lightIconMobile.classList.toggle("hidden", isDark);
  }
};

// Theme toggle function
const toggleTheme = () => {
  const isDark = document.documentElement.classList.contains("dark");

  if (isDark) {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("color-theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("color-theme", "dark");
  }

  // Update icons after toggle
  initTheme();
};

document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme icons
  initTheme();

  // Add event listeners to all theme toggles
  document.querySelectorAll('[id^="theme-toggle"]').forEach((btn) => {
    btn.addEventListener("click", toggleTheme);
  });

  // Mobile menu functionality
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
    const isExpanded =
      mobileMenuButton.getAttribute("aria-expanded") === "true";
    mobileMenuButton.setAttribute("aria-expanded", !isExpanded);

    if (!isExpanded) {
      mobileMenuButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      `;
    } else {
      mobileMenuButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      `;
    }
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      `;
      mobileMenuButton.setAttribute("aria-expanded", "false");
    });
  });

  // Project filtering
  const filterButtons = document.querySelectorAll(".project-filter");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      // Filter projects
      projectCards.forEach((card) => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Form validation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields");
        return;
      }

      if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Form submission logic would go here
      alert("Thank you for your message! I'll get back to you soon.");
      contactForm.reset();
    });
  }

  // Initialize GSAP animations
  gsap.registerPlugin(ScrollTrigger);

  // Animate sections on scroll
  gsap.utils.toArray(".section-heading, .project-card, .timeline-item").forEach((element) => {
  gsap.fromTo(element,
    { opacity: 0, y: 50 }, // Initial state
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none play reset", // Reset on leave
        onLeaveBack: self => self.progress(0) // Reset when scrolled back past
      }
    }
  );
});

  // Animate skill bars
  document.querySelectorAll(".h-full").forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";

    ScrollTrigger.create({
      trigger: bar,
      start: "top 90%",
      onEnter: () => {
        gsap.to(bar, {
          width: width,
          duration: 1.5,
          ease: "power3.out",
        });
      },
    });
  });

  // CURRENT DATE & CURRENT YEAR

  const dateElement = document.getElementById("currentDate");
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  dateElement.textContent = `${day}-${month}-${year}`;

  document.getElementById("currentYear").textContent = year;
});
