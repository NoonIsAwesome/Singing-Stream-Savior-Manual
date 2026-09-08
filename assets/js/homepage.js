(() => {

    const dialog = document.querySelector('.lightbox');
    const previewImage = dialog.querySelector('img');
    const caption = document.getElementById('image-description');
    const closeButton = dialog.querySelector('[data-close]');
    closeButton.setAttribute('aria-label', closeButton.textContent.replace(/[×✕]/g, '').trim());
    dialog.setAttribute('aria-describedby', caption.id);
    window.S3SLightbox.attach(dialog, { image: previewImage, caption, closeButton });
    let trigger = null;
    document.querySelectorAll('[data-preview]').forEach(link => {
      link.setAttribute('aria-haspopup', 'dialog');
      link.addEventListener('click', event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        trigger = link;
        previewImage.src = link.href;
        previewImage.alt = link.querySelector('img').alt;
        caption.textContent = previewImage.alt;
        dialog.showModal();
        document.body.classList.add('has-image-lightbox');
        dialog.focus({ preventScroll: true });
      });
    });
    closeButton.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => {
      if (dialog.open) return;
      document.body.classList.remove('has-image-lightbox');
      trigger?.focus({ preventScroll: true });
      trigger = null;
    });

    const heights=[10,17,12,24,18,30,21,13,26,33,19,28,14,24,31,21,12,20,28,15,22,10,17,24,13,18,8];document.querySelectorAll('.meter').forEach(m=>heights.forEach(h=>{const bar=document.createElement('i');bar.style.setProperty('--h',h+'px');m.append(bar)}));
    const states=JSON.parse(document.getElementById('homepage-states').textContent);
    document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{const mode=button.dataset.mode;document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));Object.entries(states[mode]).forEach(([key,value])=>{document.querySelector('[data-status="'+key+'"]').textContent=value[0];document.querySelector('[data-detail="'+key+'"]').textContent=value[1]});document.querySelector('[data-meter="bgm"]').classList.toggle('is-muted',mode==='sing');document.querySelector('[data-meter="track"]').classList.toggle('is-muted',mode==='chat')}));

const motion=matchMedia('(prefers-reduced-motion: reduce)');if(!motion.matches&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll('.section-header,.prep-grid,.flow-header,.workflow,.feature-grid,.obs-output').forEach(el=>{el.classList.add('will-reveal');observer.observe(el)});motion.addEventListener('change',e=>{if(e.matches){document.querySelectorAll('.will-reveal').forEach(el=>el.classList.add('is-visible'));observer.disconnect()}})}

})();
