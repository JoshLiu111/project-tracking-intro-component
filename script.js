const header = document.querySelector(".site-header");
const navToggle = document.querySelector("#nav-toggle");
const primaryNav = document.querySelector("#primary-nav");

// Single source of truth for menu state
function setOpen(isOpen) {
  header.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-expanded", isOpen);
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

// Toggle button
navToggle.addEventListener("click", () => {
  const isOpen = header.classList.contains("is-open");
  setOpen(!isOpen);
});

// Close on outside click
document.addEventListener("click", (e) => {
  if (!header.classList.contains("is-open")) return;
  if (!header.contains(e.target)) setOpen(false);
});

// Close on Escape and return focus
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (!header.classList.contains("is-open")) return;
  setOpen(false);
  navToggle.focus();
});

// Close after choosing a link
primaryNav.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;
  setOpen(false);
});

// Reset when switching to desktop layout
window.matchMedia("(min-width: 60em)").addEventListener("change", (e) => {
  if (e.matches) setOpen(false);
});
