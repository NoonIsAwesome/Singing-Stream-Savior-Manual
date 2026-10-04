(() => {
  'use strict';
  const video = document.querySelector('[data-hero-promo]');
  if (!video) return;
  const replay = document.querySelector('[data-hero-replay]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const connection = navigator.connection;
  let wantsPlayback = !motion.matches && !connection?.saveData;
  let explicitPlayback = false;
  let environmentPause = false;
  let programmaticPlay = false;
  let inView = !('IntersectionObserver' in window);
  video.muted = true;
  video.defaultMuted = true;
  // Start through reconcile so visibility and visitor preferences are checked first.
  video.autoplay = false;
  video.loop = false;

  function pauseForEnvironment() {
    if (video.paused) return;
    environmentPause = true;
    video.pause();
  }
  function play() {
    programmaticPlay = true;
    const result = video.play();
    result?.catch(() => {
      programmaticPlay = false;
      video.dataset.autoplayState = 'blocked';
    });
  }
  function reconcile() {
    if (!inView || document.hidden) { pauseForEnvironment(); return; }
    if (wantsPlayback && !video.ended && video.paused) play();
  }
  video.addEventListener('play', () => {
    if (!programmaticPlay) explicitPlayback = true;
    programmaticPlay = false;
    environmentPause = false;
    wantsPlayback = true;
    video.dataset.autoplayState = 'playing';
  });
  video.addEventListener('pause', () => {
    if (!environmentPause) wantsPlayback = false;
  });
  video.addEventListener('ended', () => {
    wantsPlayback = false;
    video.dataset.autoplayState = 'ended';
  });
  video.addEventListener('error', () => {
    wantsPlayback = false;
    replay.hidden = true;
    video.dataset.autoplayState = 'unavailable';
  });
  replay.hidden = false;
  replay.addEventListener('click', () => {
    explicitPlayback = true;
    wantsPlayback = true;
    video.currentTime = 0;
    video.muted = false;
    play();
  });
  function preferenceChanged() {
    if (!explicitPlayback && (motion.matches || connection?.saveData)) {
      wantsPlayback = false;
      video.autoplay = false;
      pauseForEnvironment();
    }
  }
  motion.addEventListener?.('change', preferenceChanged);
  connection?.addEventListener?.('change', preferenceChanged);
  document.addEventListener('visibilitychange', reconcile);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].intersectionRatio >= .25;
      reconcile();
    }, { threshold: [0, .25] }).observe(video);
  }
  reconcile();
})();
