(() => {
  const system = matchMedia('(prefers-color-scheme: dark)');
  const appearance = document.querySelector('.appearance');
  let preference = 'auto';
  try { preference = localStorage.getItem('s3s-theme') || 'auto'; } catch (_) {}
  const applyTheme = choice => {
    preference = ['auto', 'light', 'dark'].includes(choice) ? choice : 'auto';
    const theme = preference === 'auto' ? (system.matches ? 'dark' : 'light') : preference;
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0e1720' : '#ffffff';
    document.querySelectorAll('[data-theme-choice]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === preference));
      if (button.dataset.themeChoice === preference) appearance.querySelector('summary').title = appearance.querySelector('summary').getAttribute('aria-label') + ': ' + button.textContent;
    });
  };
  applyTheme(preference);
  system.addEventListener('change', () => { if (preference === 'auto') applyTheme('auto'); });
  document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => {
    applyTheme(button.dataset.themeChoice);
    try { localStorage.setItem('s3s-theme', preference); } catch (_) {}
    appearance.open = false;
  }));
  document.addEventListener('click', event => { if (!event.target.closest('.appearance')) appearance.open = false; });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') appearance.open = false; });
  const language = document.querySelector('[data-site-language]');
  language.addEventListener('change', async () => {
    const target = new URL(language.value, location.href);
    // Stable IDs are shared by translated sections. Verify the destination
    // instead of maintaining a second, inevitably incomplete anchor whitelist.
    let anchor = '';
    try { anchor = decodeURIComponent(location.hash.slice(1)); } catch (_) {}
    if (anchor && target.origin === location.origin) {
      language.disabled = true;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);
      try {
        const response = await fetch(target.pathname, { signal: controller.signal });
        if (response.ok) {
          const document = new DOMParser().parseFromString(await response.text(), 'text/html');
          if (document.getElementById(anchor)) target.hash = anchor;
        }
      } catch (_) {
        // The configured chapter URL still works when the optional lookup fails.
      } finally {
        clearTimeout(timeout);
        language.disabled = false;
      }
    }
    location.assign(target.href);
  });
})();
