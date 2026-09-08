(() => {
  const icon = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  window.S3SLightbox = {
    attach(dialog, { image, caption, closeButton }) {
      dialog.classList.add('s3s-lightbox');
      dialog.tabIndex = -1;
      closeButton.classList.add('s3s-lightbox__close');
      closeButton.innerHTML = icon;
      caption.classList.add('s3s-lightbox__caption');
      const stage = document.createElement('figure');
      stage.className = 's3s-lightbox__stage';
      const handle = document.createElement('span');
      handle.className = 's3s-lightbox__handle';
      handle.setAttribute('aria-hidden', 'true');
      stage.append(handle, image, caption);
      dialog.replaceChildren(closeButton, stage);

      const pointers = new Set();
      const motion = matchMedia('(prefers-reduced-motion: reduce)');
      let gesture = null;
      let multipleTouches = false;
      let suppressClickUntil = 0;
      const zoomed = () => (window.visualViewport?.scale || 1) > 1.02;
      const reset = () => {
        gesture = null;
        stage.classList.remove('is-dragging');
        stage.style.removeProperty('transform');
        stage.style.removeProperty('opacity');
        dialog.style.removeProperty('--lightbox-dim');
      };
      const updateZoom = () => {
        dialog.classList.toggle('is-zoomed', zoomed());
        if (zoomed()) reset();
      };
      window.visualViewport?.addEventListener('resize', updateZoom);
      updateZoom();

      dialog.addEventListener('pointerdown', event => {
        if (event.pointerType !== 'touch' || !dialog.open) return;
        pointers.add(event.pointerId);
        if (pointers.size > 1) {
          multipleTouches = true;
          reset();
          return;
        }
        if (multipleTouches || zoomed() || event.target.closest('button, a, input, select')) return;
        gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, dy: 0, active: false };
      });
      dialog.addEventListener('pointermove', event => {
        if (!gesture || event.pointerId !== gesture.id || multipleTouches || zoomed()) return;
        const dx = event.clientX - gesture.x;
        const dy = event.clientY - gesture.y;
        if (!gesture.active) {
          if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) {
            reset();
            return;
          }
          if (Math.abs(dy) < 12 || Math.abs(dy) < Math.abs(dx) * 1.3) return;
          gesture.active = true;
          dialog.setPointerCapture(event.pointerId);
          stage.classList.add('is-dragging');
        }
        gesture.dy = dy;
        if (event.cancelable) event.preventDefault();
        if (!motion.matches) {
          const progress = Math.min(Math.abs(dy) / Math.max(innerHeight, 1), 0.8);
          stage.style.transform = `translate3d(0, ${dy * 0.85}px, 0) scale(${1 - progress * 0.08})`;
          stage.style.opacity = String(1 - progress * 0.55);
          dialog.style.setProperty('--lightbox-dim', String(0.9 - progress * 0.4));
        }
      });
      const finish = (event, cancelled = false) => {
        pointers.delete(event.pointerId);
        if (gesture?.id === event.pointerId) {
          const dragged = gesture.active;
          const dismiss = !cancelled && dragged && Math.abs(gesture.dy) >= Math.min(100, innerHeight * 0.12);
          reset();
          if (dragged) suppressClickUntil = performance.now() + 400;
          if (dismiss && dialog.open) dialog.close();
        }
        if (pointers.size === 0) multipleTouches = false;
      };
      dialog.addEventListener('pointerup', event => finish(event));
      dialog.addEventListener('pointercancel', event => finish(event, true));
      dialog.addEventListener('click', event => {
        if (performance.now() < suppressClickUntil && !event.target.closest('button')) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      }, true);
      dialog.addEventListener('close', () => {
        if (dialog.open) return;
        pointers.clear();
        multipleTouches = false;
        reset();
      });
    }
  };
})();
