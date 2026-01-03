// preview-mode.js - Abilita scroll controllato quando caricato in iframe
(function() {
  // Attiva solo se caricato con ?preview=true
  if (!window.location.search.includes('preview=true')) return;

  // Disabilita interazioni utente
  document.body.style.pointerEvents = 'none';
  document.body.style.userSelect = 'none';
  document.documentElement.style.overflow = 'hidden';

  // Ascolta comandi scroll dal parent
  window.addEventListener('message', (e) => {
    if (e.data.type === 'scroll') {
      window.scrollTo({
        top: e.data.position,
        behavior: 'smooth'
      });
    }
    if (e.data.type === 'scrollPercent') {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: maxScroll * e.data.percent,
        behavior: 'smooth'
      });
    }
  });

  // Notifica parent che siamo pronti
  if (window.parent !== window) {
    window.parent.postMessage({ type: 'previewReady' }, '*');
  }
})();
