(() => {
  const languageSwitcher = document.querySelector("[data-language-switcher]");
  if (languageSwitcher) {
    languageSwitcher.addEventListener("change", () => {
      const target = new URL(languageSwitcher.value, window.location.href);
      const selectedLanguage = languageSwitcher.selectedOptions[0]?.dataset.lang;
      const section = window.location.hash.replace(/^#/, "");

      if (section && !target.hash) {
        if (selectedLanguage === "zh-TW") {
          if (!target.pathname.endsWith("/guide.html")) {
            target.pathname = `${target.pathname.replace(/\/?$/, "/")}guide.html`;
          }
          target.hash = section;
        } else {
          target.hash = section;
        }
      }
      window.location.assign(target.href);
    });
  }

  const chapterLinks = [...document.querySelectorAll(".chapter-list a")]
    .map((link) => {
      const url = new URL(link.href, window.location.href);
      const target = url.hash ? document.getElementById(url.hash.slice(1)) : null;
      return target ? { link, target, hash: url.hash } : null;
    })
    .filter(Boolean);

  const setCurrentChapter = (hash, updateAddress = false) => {
    if (!hash || !chapterLinks.some((chapter) => chapter.hash === hash)) {
      return;
    }

    chapterLinks.forEach(({ link, hash: linkHash }) => {
      if (linkHash === hash) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (updateAddress && window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  };

  const syncChapterFromScroll = () => {
    if (!chapterLinks.length) {
      return;
    }

    const header = document.querySelector(".site-header");
    const readingLine = (header?.getBoundingClientRect().height || 0) + 48;
    let current = chapterLinks[0];

    chapterLinks.forEach((chapter) => {
      if (chapter.target.getBoundingClientRect().top <= readingLine) {
        current = chapter;
      }
    });

    const reachedPageEnd =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    if (reachedPageEnd) {
      current = chapterLinks[chapterLinks.length - 1];
    }

    setCurrentChapter(current.hash, true);
  };

  if (chapterLinks.length) {
    const initialChapter = chapterLinks.find(
      (chapter) => chapter.hash === window.location.hash
    );
    let scrollSpyReady = !initialChapter;

    if (initialChapter) {
      setCurrentChapter(initialChapter.hash);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const root = document.documentElement;
          const previousScrollBehavior = root.style.scrollBehavior;
          root.style.scrollBehavior = "auto";
          initialChapter.target.scrollIntoView({ block: "start" });
          root.style.scrollBehavior = previousScrollBehavior;
          setCurrentChapter(initialChapter.hash);

          window.setTimeout(() => {
            scrollSpyReady = true;
            syncChapterFromScroll();
          }, 120);
        });
      });
    } else {
      setCurrentChapter(chapterLinks[0].hash);
    }

    let chapterFrame = 0;
    window.addEventListener("scroll", () => {
      if (!scrollSpyReady || chapterFrame) {
        return;
      }
      chapterFrame = window.requestAnimationFrame(() => {
        syncChapterFromScroll();
        chapterFrame = 0;
      });
    }, { passive: true });

    window.addEventListener("hashchange", () => {
      setCurrentChapter(window.location.hash);
    });
  }

  document.querySelectorAll("[data-video-embed]").forEach((placeholder) => {
    placeholder.addEventListener("click", () => {
      const embedUrl = placeholder.dataset.videoEmbed;
      if (!embedUrl) {
        return;
      }

      const frame = document.createElement("div");
      frame.className = "video-frame";

      const iframe = document.createElement("iframe");
      iframe.src = embedUrl;
      iframe.title = placeholder.dataset.videoTitle || "Tutorial video";
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;

      frame.appendChild(iframe);
      placeholder.replaceWith(frame);
    }, { once: true });
  });

  const button = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".guide-sidebar");

  if (!button || !navigation) {
    return;
  }

  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    navigation.dataset.open = String(open);
    document.body.style.overflow = open ? "hidden" : "";
  };

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      button.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      setOpen(false);
    }
  });
})();
