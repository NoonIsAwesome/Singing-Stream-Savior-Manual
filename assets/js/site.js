(() => {
  const languageSwitcher = document.querySelector("[data-language-switcher]");
  if (languageSwitcher) {
    languageSwitcher.addEventListener("change", () => {
      const target = new URL(languageSwitcher.value, window.location.href);
      const selectedLanguage = languageSwitcher.selectedOptions[0]?.dataset.lang;
      const section = window.location.hash.replace(/^#/, "");

      if (section && !target.hash) {
        if (selectedLanguage === "zh-TW") {
          target.pathname = `${target.pathname}${section}.html`;
        } else {
          target.hash = section;
        }
      }
      window.location.assign(target.href);
    });
  }

  const syncCurrentChapter = () => {
    if (!window.location.hash) {
      return;
    }

    document.querySelectorAll(".chapter-list a").forEach((link) => {
      const active = new URL(link.href, window.location.href).hash === window.location.hash;
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  syncCurrentChapter();
  window.addEventListener("hashchange", syncCurrentChapter);

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
