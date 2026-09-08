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
  language.addEventListener('change', () => {
    const target = new URL(language.value, location.href);
    const sharedAnchors = ['getting-started','library-and-playback','lyrics','obs-and-themes','obs-websocket','uvr-vocal-removal','workspace-modes','settings-and-troubleshooting','what-is-a-profile','advanced-quick-start','software-download','operation-videos'];
    const anchor = location.hash.slice(1);
    if (!target.hash && sharedAnchors.includes(anchor) && target.pathname.split('/').pop() === location.pathname.split('/').pop()) target.hash = anchor;
    location.assign(target.href);
  });
})();
