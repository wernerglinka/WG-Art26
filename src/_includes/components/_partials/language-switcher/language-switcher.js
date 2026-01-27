/**
 * Language Switcher Component
 *
 * Manages language selection with URL-based navigation for multi-language sites.
 * Uses explicit alternate URLs from frontmatter (seo.alternate) when available,
 * otherwise falls back to path-based URL construction.
 *
 * Features:
 * - Dropdown language selector
 * - URL-based language navigation with frontmatter alternate support
 * - Persists preference to localStorage
 * - Sets document lang attribute
 * - Keyboard accessible
 * - Click outside to close
 * - SWUP compatible
 */

/**
 * Initialize a language switcher element
 * @param {HTMLElement} switcher - The language switcher container
 */
function initLanguageSwitcher(switcher) {
  if (switcher.dataset.initialized) {
    return;
  }

  const toggle = switcher.querySelector('.icon-wrapper');
  const dropdown = switcher.querySelector('.js-language-dropdown');
  const currentLangDisplay = switcher.querySelector('.js-current-lang');
  const options = switcher.querySelectorAll('.js-language-option');
  const defaultLang = switcher.dataset.defaultLang || 'en';
  const fallbackUrl = switcher.dataset.fallbackUrl || '/404/';

  // Build list of available locales from the dropdown options
  const locales = Array.from(dropdown.querySelectorAll('[data-lang]')).map(
    (el) => el.dataset.lang
  );

  /**
   * Strip locale prefix from a path to get the base path
   * @param {string} path - The URL path
   * @returns {string} The base path without locale prefix
   */
  const getBasePath = (path) => {
    for (const locale of locales) {
      if (locale !== defaultLang && path.startsWith(`/${  locale  }/`)) {
        return path.slice(locale.length + 1);
      }
    }
    return path;
  };

  /**
   * Build localized path for a given locale
   * @param {string} basePath - The base path without locale
   * @param {string} locale - The target locale
   * @returns {string} The localized path
   */
  const getLocalizedPath = (basePath, locale) => {
    if (locale === defaultLang) {
      return basePath;
    }
    return `/${  locale  }${basePath}`;
  };

  /**
   * Detect current locale from URL path
   * @returns {string} The current locale code
   */
  const getCurrentLocale = () => {
    const path = window.location.pathname;
    for (const locale of locales) {
      if (locale !== defaultLang && path.startsWith(`/${  locale  }/`)) {
        return locale;
      }
    }
    return defaultLang;
  };

  /**
   * Check if a URL exists (returns 200) using a HEAD request
   * @param {string} url - The URL to check
   * @returns {Promise<boolean>} Whether the URL exists
   */
  const urlExists = async (url) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  /**
   * Get stored language preference or detect from URL
   * @returns {string} Language code
   */
  const getStoredLang = () => {
    const stored = localStorage.getItem('language');
    if (stored) {
      return stored;
    }
    return getCurrentLocale();
  };

  /**
   * Set language preference (localStorage and document attribute only)
   * @param {string} langCode - The language code to set
   */
  const setLanguage = (langCode) => {
    localStorage.setItem('language', langCode);
    document.documentElement.lang = langCode;
    currentLangDisplay.textContent = langCode.toUpperCase();

    // Update aria-selected states
    dropdown.querySelectorAll('[role="option"]').forEach((option) => {
      option.setAttribute('aria-selected', option.dataset.lang === langCode ? 'true' : 'false');
    });
  };

  /**
   * Toggle dropdown visibility
   */
  const toggleDropdown = () => {
    const isExpanded = switcher.getAttribute('aria-expanded') === 'true';
    switcher.setAttribute('aria-expanded', !isExpanded);
    dropdown.classList.toggle('is-open', !isExpanded);
  };

  /**
   * Close dropdown
   */
  const closeDropdown = () => {
    switcher.setAttribute('aria-expanded', 'false');
    dropdown.classList.remove('is-open');
  };

  // Initialize with stored preference or detected locale
  const storedLang = getStoredLang();
  setLanguage(storedLang);

  // Toggle button click
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleDropdown();
  });

  // Language option clicks - navigate to localized URL or fallback
  options.forEach((option) => {
    option.addEventListener('click', async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const listItem = option.closest('[data-lang]');
      const langCode = listItem.dataset.lang;
      const explicitUrl = listItem.dataset.url;
      const currentPath = window.location.pathname;

      // Set preference regardless of navigation
      setLanguage(langCode);
      closeDropdown();

      // Use explicit alternate URL if provided in frontmatter
      if (explicitUrl) {
        if (explicitUrl !== currentPath) {
          window.location.href = explicitUrl;
        }
        return;
      }

      // Fall back to path-based URL construction
      const basePath = getBasePath(currentPath);
      const targetPath = getLocalizedPath(basePath, langCode);

      // If selecting the current page's language, no navigation needed
      if (targetPath === currentPath) {
        return;
      }

      // Check if the localized page exists
      const exists = await urlExists(targetPath);

      if (exists) {
        window.location.href = targetPath;
      } else {
        // Fall back to the configured fallback URL
        window.location.href = fallbackUrl;
      }
    });
  });

  // Close on click outside
  document.addEventListener('click', (e) => {
    if (!switcher.contains(e.target)) {
      closeDropdown();
    }
  });

  // Keyboard navigation
  toggle.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
      toggle.focus();
    }
  });

  dropdown.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
      toggle.focus();
    }
  });

  switcher.dataset.initialized = 'true';
}

/**
 * Initialize all language switchers on the page
 */
function initAllLanguageSwitchers() {
  document.querySelectorAll('.js-language-switcher').forEach(initLanguageSwitcher);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initAllLanguageSwitchers);

// SWUP compatibility - re-initialize after page transitions
if (window.PageTransitions) {
  window.PageTransitions.registerComponent('language-switcher', initAllLanguageSwitchers);
}
