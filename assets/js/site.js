(() => {
  const recordProductionPageview = () => {
    const expectedHost = document.body.dataset.analyticsHost;
    const endpoint = document.body.dataset.pageviewEndpoint;

    if (
      !expectedHost ||
      !endpoint ||
      window.location.hostname !== expectedHost ||
      navigator.webdriver
    ) {
      return;
    }

    // Aggregate page-view counting only. The opaque request keeps the counter
    // independent from the visible interface and does not set a site cookie.
    window
      .fetch(endpoint, {
        method: "GET",
        mode: "no-cors",
        cache: "no-store",
        credentials: "omit",
        keepalive: true,
      })
      .catch(() => {});
  };

  recordProductionPageview();

  const placeEffectEditorScreenshots = () => {
    document.querySelectorAll("[data-effect-editor-gallery]").forEach((source) => {
      let reference = source.nextElementSibling;
      while (reference && !reference.classList.contains("effect-reference")) {
        reference = reference.nextElementSibling;
      }

      if (!reference) {
        source.hidden = false;
        source.classList.add("effect-editor-gallery");
        return;
      }

      const details = [...reference.children].filter(
        (child) => child.tagName === "DETAILS",
      );
      const templates = [...source.querySelectorAll("[data-effect-editor-template]")];

      templates.forEach((template, index) => {
        const body = details[index]?.querySelector(".effect-reference__body");
        if (body) {
          body.prepend(template.content.cloneNode(true));
        }
      });
      source.remove();
    });
  };

  placeEffectEditorScreenshots();

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

      const alignInitialChapter = () => {
        if (window.location.hash !== initialChapter.hash) {
          scrollSpyReady = true;
          return;
        }

        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        initialChapter.target.scrollIntoView({ block: "start", behavior: "auto" });
        setCurrentChapter(initialChapter.hash);
        window.requestAnimationFrame(() => {
          root.style.scrollBehavior = previousScrollBehavior;
        });
      };

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          alignInitialChapter();
        });
      });
      window.addEventListener("load", alignInitialChapter, { once: true });
      [250, 750, 1500].forEach((delay) => {
        window.setTimeout(alignInitialChapter, delay);
      });
      window.setTimeout(() => {
        scrollSpyReady = true;
        syncChapterFromScroll();
      }, 1700);
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

  const article = document.querySelector(".manual-article");
  if (article) {
    const articleHeadings = [...article.querySelectorAll(":scope > h2[id]")];
    if (articleHeadings.length >= 2) {
      const outline = document.createElement("nav");
      outline.className = "article-outline";
      outline.setAttribute("aria-label", document.body.dataset.outlineLabel || "On this page");

      const outlineTitle = document.createElement("strong");
      outlineTitle.textContent = document.body.dataset.outlineLabel || "On this page";
      const outlineList = document.createElement("ul");

      articleHeadings.forEach((heading) => {
        const item = document.createElement("li");
        const link = document.createElement("a");
        link.href = `#${encodeURIComponent(heading.id)}`;
        link.textContent = heading.textContent.trim();
        item.append(link);
        outlineList.append(item);
      });

      outline.append(outlineTitle, outlineList);
      const quickStart = article.querySelector(
        ":scope > .chapter-quick-start, :scope > [data-article-lead]",
      );
      const firstHeading = article.querySelector(":scope > h1");
      const outlineAnchor = quickStart || firstHeading;
      if (outlineAnchor) {
        outlineAnchor.insertAdjacentElement("afterend", outline);
      }
    }
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

  const imagePreviewLabels = {
    "zh-TW": {
      dialog: "圖片放大預覽",
      open: "放大預覽",
      close: "關閉",
    },
    "zh-CN": {
      dialog: "图片放大预览",
      open: "放大预览",
      close: "关闭",
    },
    en: {
      dialog: "Enlarged image preview",
      open: "Enlarge image",
      close: "Close",
    },
    ja: {
      dialog: "画像の拡大プレビュー",
      open: "拡大表示",
      close: "閉じる",
    },
    ko: {
      dialog: "이미지 확대 미리보기",
      open: "크게 보기",
      close: "닫기",
    },
  };
  const imagePreviewLanguage = document.documentElement.lang;
  const imagePreviewText =
    imagePreviewLabels[imagePreviewLanguage] || imagePreviewLabels.en;
  const imagePreviewLinks = [...document.querySelectorAll(".manual-article a[href]")]
    .filter((link) => {
      const image = link.querySelector(":scope > img");
      if (!image) {
        return false;
      }
      try {
        return /\.(?:avif|gif|jpe?g|png|webp)$/i.test(
          new URL(link.href, window.location.href).pathname
        );
      } catch {
        return false;
      }
    });

  if (imagePreviewLinks.length && typeof HTMLDialogElement !== "undefined") {
    const dialog = document.createElement("dialog");
    dialog.className = "image-lightbox";
    dialog.setAttribute("aria-label", imagePreviewText.dialog);

    const closeButton = document.createElement("button");
    closeButton.className = "image-lightbox__close";
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", imagePreviewText.close);
    closeButton.innerHTML = `
      <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
        <path d="M6 6l12 12M18 6L6 18"></path>
      </svg>
      <span>${imagePreviewText.close}</span>
    `;

    const stage = document.createElement("div");
    stage.className = "image-lightbox__stage";

    const previewImage = document.createElement("img");
    previewImage.className = "image-lightbox__image";
    previewImage.decoding = "async";

    const caption = document.createElement("p");
    caption.className = "image-lightbox__caption";
    caption.id = "image-lightbox-caption";
    dialog.setAttribute("aria-describedby", caption.id);

    stage.append(previewImage, caption);
    dialog.append(closeButton, stage);
    document.body.append(dialog);

    let imagePreviewTrigger = null;

    const closeImagePreview = () => {
      if (dialog.open) {
        dialog.close();
      }
    };

    closeButton.addEventListener("click", closeImagePreview);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        closeImagePreview();
      }
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("has-image-lightbox");
      previewImage.removeAttribute("src");
      imagePreviewTrigger?.focus();
      imagePreviewTrigger = null;
    });

    imagePreviewLinks.forEach((link) => {
      const thumbnail = link.querySelector(":scope > img");
      const description =
        thumbnail.getAttribute("alt")?.trim() || imagePreviewText.dialog;

      link.classList.add("image-preview-trigger");
      link.setAttribute("aria-haspopup", "dialog");
      link.setAttribute(
        "aria-label",
        `${description} — ${imagePreviewText.open}`
      );

      link.addEventListener("click", (event) => {
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        event.preventDefault();
        imagePreviewTrigger = link;
        previewImage.src = link.href;
        previewImage.alt = "";
        caption.textContent = description;
        document.body.classList.add("has-image-lightbox");
        dialog.showModal();
        closeButton.focus();
      });
    });
  }

  const button = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".guide-sidebar");
  const backdrop = document.querySelector(".nav-backdrop");
  const collapseButton = document.querySelector(".sidebar-collapse");
  const chapterSearch = document.querySelector("[data-chapter-search]");
  const chapterSearchEmpty = document.querySelector("[data-chapter-search-empty]");

  if (!button || !navigation) {
    return;
  }

  const sidebarStorageKey = "s3s-manual-sidebar-collapsed";
  const setCollapsed = (collapsed) => {
    document.body.classList.toggle("sidebar-collapsed", collapsed);
    if (!collapseButton) {
      return;
    }
    const label = collapsed
      ? collapseButton.dataset.expandLabel
      : collapseButton.dataset.collapseLabel;
    collapseButton.setAttribute("aria-expanded", String(!collapsed));
    collapseButton.setAttribute("aria-label", label);
    collapseButton.title = label;
  };

  let storedCollapsed = false;
  try {
    storedCollapsed = window.localStorage.getItem(sidebarStorageKey) === "true";
  } catch {
    storedCollapsed = false;
  }
  setCollapsed(storedCollapsed);

  collapseButton?.addEventListener("click", () => {
    const collapsed = !document.body.classList.contains("sidebar-collapsed");
    setCollapsed(collapsed);
    try {
      window.localStorage.setItem(sidebarStorageKey, String(collapsed));
    } catch {
      // The preference is optional when storage is unavailable.
    }
  });

  if (chapterSearch) {
    const chapterItems = [...navigation.querySelectorAll(".chapter-list li")];
    chapterSearch.addEventListener("input", () => {
      const query = chapterSearch.value.trim().toLocaleLowerCase();
      let visibleCount = 0;
      chapterItems.forEach((item) => {
        const matches = !query || item.textContent.toLocaleLowerCase().includes(query);
        item.classList.toggle("is-filtered", !matches);
        if (matches) {
          visibleCount += 1;
        }
      });
      if (chapterSearchEmpty) {
        chapterSearchEmpty.hidden = visibleCount !== 0;
      }
    });
  }

  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    navigation.dataset.open = String(open);
    if (backdrop) {
      backdrop.hidden = !open;
    }
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

  backdrop?.addEventListener("click", () => {
    setOpen(false);
    button.focus();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
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
