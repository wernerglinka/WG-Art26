/**
 * Multi-Tab Component
 *
 * Handles tab switching with proper ARIA attributes and keyboard navigation.
 * When a panel is revealed, dispatches a 'tab:revealed' CustomEvent on the panel
 * element so that any component inside (image-grid, media, etc.) can reinitialize
 * itself. Components subscribe to this event independently — multi-tab has no
 * knowledge of which component types are in its panes.
 *
 * @module multi-tab
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

  // Notify components inside this panel that they are now visible.
  // Each component that needs reinitialization listens for this event.
  panel.dispatchEvent(new CustomEvent('tab:revealed', { bubbles: true }));
}

/**
 * Initializes all multi-tab components on the page.
 */
function initMultiTabs() {
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
 * Cleanup multi-tab components.
 */
function cleanupMultiTabs() {
  const containers = document.querySelectorAll('.tabs-component[data-initialized]');
  containers.forEach((container) => {
    delete container.dataset.initialized;
  });
}

// Register with page transitions for SWUP support
if (window.PageTransitions) {
  window.PageTransitions.registerComponent('multi-tab', initMultiTabs);
  window.PageTransitions.registerCleanup('multi-tab', cleanupMultiTabs);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMultiTabs);
} else {
  initMultiTabs();
}
