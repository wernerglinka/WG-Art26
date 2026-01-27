/**
 * Main JavaScript file
 */

// Scroll handling for "to top" button visibility
(function () {
  let ticking = false;

  function handleScroll() {
    if (window.scrollY > 200) {
      document.body.classList.add('scrolling');
    } else {
      document.body.classList.remove('scrolling');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  });
})();

// Mobile menu toggle
(function () {
  const hamburger = document.querySelector('.hamburger-menu');
  const mainMenu = document.querySelector('.main-menu');

  if (hamburger && mainMenu) {
    hamburger.addEventListener('click', function () {
      mainMenu.classList.toggle('is-open');
      hamburger.classList.toggle('is-active');
    });
  }
})();

// Top message dismiss
(function () {
  const closeButton = document.querySelector('.top-message-close');
  const topMessage = document.querySelector('.top-message');

  if (closeButton && topMessage) {
    closeButton.addEventListener('click', function () {
      topMessage.style.display = 'none';
    });
  }
})();
