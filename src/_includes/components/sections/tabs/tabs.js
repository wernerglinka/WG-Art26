/**
 * Tabs Component
 *
 * Handles tab switching with proper ARIA attributes and keyboard navigation.
 * After revealing a panel, triggers reinitialization of any image grids inside
 * that were hidden (and therefore laid out at zero width).
 *
 * @module tabs
 */

/**
 * Activates a tab and shows its panel.
 *
 * @param {HTMLElement} container - The .tabs-component element
 * @param {HTMLElement} tab - The tab button to activate
 */
function activateTab(container, tab) {
  const tabs = container.querySelectorAll('.tabs-button');
  const panelId = tab.getAttribute('aria-controls');
  const panel = container.querySelector(`#${panelId}`);

  // Deactivate all tabs
  tabs.forEach((t) => {
    t.setAttribute('aria-selected', 'false');
    t.setAttribute('tabindex', '-1');
  });

  // Hide all panels
  container.querySelectorAll('.tabs-panel').forEach((p) => {
    p.setAttribute('hidden', '');
  });

  // Activate selected tab
  tab.setAttribute('aria-selected', 'true');
  tab.setAttribute('tabindex', '0');
  tab.focus();

  // Show selected panel
  panel.removeAttribute('hidden');

  // Reinitialize any image grids in the newly visible panel.
  // Grids that were in hidden panels have zero width and need relayout.
  const grid = panel.querySelector('.js-image-grid');
  if (grid && !grid.classList.contains('is-laid-out')) {
    delete grid.dataset.initialized;
    if (window.initImageGrids) {
      window.initImageGrids();
    }
  }
}

/**
 * Initializes all tabs components on the page.
 */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs-component');

  tabContainers.forEach((container) => {
    if (container.dataset.initialized) { return; }
    container.dataset.initialized = 'true';

    const tabs = container.querySelectorAll('.tabs-button');

    // Click handler
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activateTab(container, tab);
      });
    });

    // Keyboard navigation (arrow keys between tabs)
    container.querySelector('.tabs-nav').addEventListener('keydown', (event) => {
      const tabArray = Array.from(tabs);
      const currentIndex = tabArray.indexOf(document.activeElement);

      let newIndex;
      if (event.key === 'ArrowRight') {
        newIndex = (currentIndex + 1) % tabArray.length;
      } else if (event.key === 'ArrowLeft') {
        newIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
      } else if (event.key === 'Home') {
        newIndex = 0;
      } else if (event.key === 'End') {
        newIndex = tabArray.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      activateTab(container, tabArray[newIndex]);
    });
  });
}

/**
 * Cleanup tabs components.
 */
function cleanupTabs() {
  const containers = document.querySelectorAll('.tabs-component[data-initialized]');
  containers.forEach((container) => {
    delete container.dataset.initialized;
  });
}

// Register with page transitions for SWUP support
if (window.PageTransitions) {
  window.PageTransitions.registerComponent('tabs', initTabs);
  window.PageTransitions.registerCleanup('tabs', cleanupTabs);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTabs);
} else {
  initTabs();
}
