/*
 * JavaScript to handle interactive elements on the Eclat Synergy website.
 * This script toggles the mobile navigation and service dropdowns while
 * updating ARIA attributes for accessibility.
 */

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav');
  const toggleButton = document.getElementById('menu-toggle');

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
      toggleButton.setAttribute('aria-expanded', (!expanded).toString());
      nav.classList.toggle('open');
    });
  }

  // Dropdown toggles
  const dropdownButtons = document.querySelectorAll('.dropdown-toggle');
  dropdownButtons.forEach(button => {
    button.addEventListener('click', event => {
      // Prevent default behaviour to stop focus from leaving
      event.preventDefault();
      const expanded = button.getAttribute('aria-expanded') === 'true';
      // Close any other open dropdowns
      dropdownButtons.forEach(btn => {
        if (btn !== button) {
          btn.setAttribute('aria-expanded', 'false');
          btn.parentElement.classList.remove('open');
        }
      });
      button.setAttribute('aria-expanded', (!expanded).toString());
      button.parentElement.classList.toggle('open');
    });
  });

  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  // Scroll-triggered reveal animations using IntersectionObserver
  // Only run if the browser supports IntersectionObserver and the user has not requested reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
      threshold: 0.2
    };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stop observing once element is visible to improve performance
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);
    revealElements.forEach(el => observer.observe(el));
  } else {
    // If IntersectionObserver is not supported or reduced motion is preferred, show elements immediately
    document.querySelectorAll('.reveal').forEach(el => {
      el.classList.add('visible');
    });
  }
});