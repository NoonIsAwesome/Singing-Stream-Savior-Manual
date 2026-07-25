(() => {
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
